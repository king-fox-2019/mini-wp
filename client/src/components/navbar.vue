
 <template>
    <b-navbar style="box-shadow: 4px 10px 25px -9px rgba(0,0,0,0.16);height:100px">
        <template slot="brand">
                <b-navbar-item >
                    <img
                        v-on:click.prevent="showHome()" 
                        src="../../dist/all-kpop-logo.png"
                        alt="Lightweight UI components for Vue.js based on Bulma"
                    >
                </b-navbar-item>
            </template>
            <template slot="start">

                <b-navbar-item href="#" v-on:click.prevent="showHome()" >
                    Home
                </b-navbar-item>
                
                
            </template>

            <template slot="end">
                <b-navbar-item tag="div">
                    <div class="buttons">
                        <a href="#" class="button is-primary" v-on:click.prevent="logOut();" >Log out</a>
                    </div>
                </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
export default {
    name:'navbar',
    
    data(){
        return {
            
        }

    },
    methods: {
        logOut(){
            localStorage.clear()
            this.$emit('loginStatus',false)
        },
        showHome(){
            console.log('homeee')
            this.$emit('showPersonalPage','public')
        }
    }

}
</script>

<style>

</style>