<template>
    <div v-if="isLoading">
        Loading...
    </div>
    <button v-else-if="likeCount === 0" @click="likesPost" >
        Like Counter
    </button>

    <button v-else @click="likesPost">
        Likes
        <span>{{ likeCount }}</span>
    </button>
    <!-- {{ likeClicks }} -->
</template>

<script lang="ts" setup>

    import { ref, watch } from 'vue';
    import confetti from 'canvas-confetti'
    import debounce from 'lodash.debounce'

    interface Props {
        postId: string
    }

    const props = defineProps<Props>();

    const likeCount = ref(0);
    const likeClicks = ref(0);
    const isLoading = ref(true);

    watch( likeCount, debounce(() => {
        fetch(`/api/post/likes/${props.postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                likes: likeClicks.value
            })
        })

        likeClicks.value = 0
    }, 500))


    const likesPost = () => {
        likeCount.value += 1
        likeClicks.value += 1
        confetti(
            {
                particleCount: 100,
                spread: 70,
                origin: {
                    x: Math.random(),
                    y: Math.random() - 0.2
                },
                zIndex: 1
            }
        )
    }

    const getCurrentLikes = async () => {
        const resp = await fetch(`/api/post/likes/${props.postId}`);
        if( !resp.ok ) {
            return
        }
        const data = await resp.json();
        console.log(data)

        likeCount.value = data.likes
        isLoading.value = false
    }

    getCurrentLikes();
</script>

<style scoped>
button{
    background-color: #5e51bc;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
}

button:hover{
    background-color: #4b3f9b;
}

</style>