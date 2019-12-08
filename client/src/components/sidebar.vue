<template>

    <aside class="column is-3 is-narrow-mobile is-fullheight section is-hidden-mobile" style="background-color:white;box-shadow: 4px 10px 25px -9px rgba(0,0,0,0.16)">

        <div class="sidebars" style="margin-left:30px;">
​                <ul class="menu-list">
                    <p class="menu-label is-hidden-touch">Navigation</p>
    ​                <li style="margin-bottom:50px">
    ​                     <b-field grouped style="display:flex;align-items:center">
    ​                        <b-input  v-model="keyword" placeholder="Search..." style="width:60%"></b-input>
                            <p class="control">
    ​                            <button @click.prevent="sendKeyword" class="button is-primary">Search</button>
    ​                        </p>
    ​                    </b-field>
    ​                </li>
    ​                <li>
    ​                    <a href="#" class="" @click="openCreateForm">
    ​                    <span class="icon"><i class="fas fa-plus-circle" ></i></span>   Add articles
    ​                    </a>
    ​                </li>
    ​                <li>
    ​                    <a href="#" class="" @click="showPersonal">
    ​                    <span class="icon"><i class="fa fa-table"></i></span>   My articles
    ​                    </a>
    ​                </li>
    ​                <li>
    ​                    <a href="#" class="">
    ​                    <span class="icon"><i class="fa fa-info"></i></span>   About
    ​                    </a>
    ​                </li>
                     
​                </ul>

                <ul class="menu-list" style="margin-top : 70px">
                    <p class="menu-label is-hidden-touch">Tags</p>

    
    ​                <li>
    ​                   <div class="buttons" >
                            <b-button @click.prevent="sendTagsFilter(filteredTags[index])" v-for="(tag,index) in filteredTags" :key='index' rounded type="is-primary" size="is-small"><i class="fas fa-tag"></i>
                                {{tag}}
                            </b-button>
                        </div>
    ​                </li>
​                </ul>                
    ​    </div>             

    </aside>

    <!-- ---------------------------------------------------------------- -->

</template>
<script>
import axios from '../apis/server'
    export default {
        props: ['filteredTags'],
        data() {
            return {
                keyword : '',
                title : '',
                projects : [],
                title:'',
                dropFiles : [],
                tags : [],
                createPage: true,
                isModalActive: false,
                index : 0,
                  description: {
                        ops: [],
                    },
                    config: {
                        placeholder: 'Compose an epic...',
                    },   
            
                isImageModalActive: false,
                isCardModalActive: false
            }
        },
        methods : {
            sendKeyword(event){
                this.$emit('searchKeyword',this.keyword)
                this.keyword = ''
                // console.log(this.keyword)
            },
            sendTagsFilter(tag){
                // console.log(tag)
                this.$emit('searchKeyword',tag)
            },
            showPersonal(){
               this.$emit('showPersonalPage','personal')
            },
            openCreateForm(){
                this.$emit('openCreateForm','create')
            },
            closeCreateForm(){
                this.$emit('openCreateForm',false)
            }
        },
         mounted() {

            axios({
                method: 'get',
                url : '/projects/all',
            })
            .then(({data})=>{
                console.log('from sidebar')
                this.projects = data
                // let tags = []
                // for(let i = 0 ; i < data.length; i++){
                //     for( let j = 0 ; j < data[i].tags.length; j++){
                //         if(tags.indexOf(data[i].tags[j]) === -1) {
                //             tags.push(data[i].tags[j]);
                //         }
                //     }
                // }
                // this.tags = tags
                
            })
            .catch(err => {
                console.log(err)
            })
        }
}
</script>

<style>

li{
    height:25px;
    margin-top: 0px;
}


</style>