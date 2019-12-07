<template>
    <div>
        <div class="container-fluid d-flex justify-content-center align-items-center signin-form">
            <div class="w-50 d-flex justify-content-center">
                <form class="w-75 p-5 mt-3">
                    <h1 class="mb-5">Signin</h1>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <div class="input-group-text"><i class="far fa-envelope"></i></div>
                            </div>
                            <input type="text" class="form-control" id="emailLog" aria-describedby="emailHelp" placeholder="Email">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <div class="input-group-text"><i class="fas fa-lock"></i></div>
                            </div>
                            <input type="password" class="form-control" id="passLog" placeholder="Password">
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Signin</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.signin-form{
    height: calc(100vh - 80px);
}
</style>