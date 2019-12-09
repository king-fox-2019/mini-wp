<template>
    <transition name="fade">
        <section id="blog-post">
            <div class="search-bar mb-5">
                <input type="text" id="search-input" placeholder="Search Blog...">
                <button @click="filter">
                    <i class="fa fa-search"></i>
                </button>
            </div>
            <ul class="mt-4 article-list">
                <li class="shadow p-3 mb-4 bg-light rounded"  :key="index" v-for="(article, index) in articles ">
                    <header class="list-header">
                        <h2>{{ article.title }}</h2>
                        <div class="action-wrapper">
                            <button id="view-article" class="btn btn-primary">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button id="edit-article" class="btn btn-primary" :data-id="article._id"
                                @click="setEditArticle(article._id)">
                                <i class="fas fa-pencil-alt"></i>
                            </button>
                            <button id="delete-article" class="btn btn-danger"
                                @click="deleteArticle(article._id)">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </header>
                    <hr class="my-2">
                    <label>{{ article.created_at }}</label>
                </li>
            </ul>
        </section>
    </transition>
</template>

<script>
export default {
    methods: {
        filter: function() {
            const findArticle = document.getElementById('search-input').value
            axios({
                method: 'get',
                url: `${baseUrl}/articles/${findArticle}`
            })
                .then(({data}) => {
                    data.forEach(article => {
                        for (const key in article) {
                            if (key === 'created_at') {
                                article.created_at = formatDate(article.created_at)
                            }
                        }
                    });
                    this.articles = data
                })
                .catch(err => console.log(err))
        }
    }
}
</script>

<style scoped>
    #blog-post, 
    #new-article, 
    #update-article {
        width: 80%;
        margin: 2rem auto;
    }

    .search-bar {
        position: relative;
        display: flex;
        height: 3rem;
        background-color: #fff;
        border: 1px #a1a1a1 solid;
    }

    .search-bar a {
        padding: 0 1.4rem;
        display: block;
        height: 100%;
        line-height: 3rem;
        color: #2b2b28;
    }

    .search-bar a:hover {
        text-decoration: none;
        border-bottom: 3px #e3b04b solid;
    }

    .search-bar input[type="text"] {
        width: 100%;
        border: none;
        padding: 0 1rem;
        background-color: #fffbf5;
        height: 100%;
    }

    .search-bar button {
        display: block;
        border: none;
        width: 4rem;
        height: 100%;
        background-color: #fff;
    }

    .article-list {
        position: relative;
    }

    .article-list li{
        width: 100%;
        border: 1px #a1a1a1 solid;
        background-color: #fff;
    }

    .list-header {
        display: flex;
        align-items: center;
    }

    .list-header button {
        font-size: 0.6rem;
    }

    .action-wrapper {
        margin-left: auto;
    }

    #article-title {
        width: 100%;
        height: 3rem;
        margin-bottom: 1rem;
        padding: 0 1rem;
    }

    #article-editor {
        background-color: #fff;
        font-size: 16px;
        font-family: 'Roboto Slab', serif;
        height: 300px !important;
        margin-bottom: 1rem;
    }
</style>