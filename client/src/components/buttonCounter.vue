<template>
    <div>
        <button v-on:click="counteran++">You clicked me {{ counteran }} times.</button>
    </div>

</template>





<script>
export default {
    data: function(){
        return{
            counteran:0
        }
    }


}
</script>






<style>

</style>