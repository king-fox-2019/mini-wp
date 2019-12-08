<template>
    <header>
        <nav class="rad-navigation">
            <div class="rad-logo-container rad-nav-min">
                <a href="/#/" class="rad-logo"><i class=" fa fa-wordpress"></i>MiniWP</a>
                <a href="#" class="rad-toggle-btn pull-right"><i class="fa fa-bars"></i></a>
            </div>
            <a href="/#/" class="rad-logo-hidden">MiniWP</a>
            <div class="rad-top-nav-container">
                <a href="" class="brand-icon"><i class="fa fa-recycle"></i></a>
                <ul class="pull-right links">
                    <li class="rad-dropdown no-color">
                        <a class="rad-menu-item" href="#"><img class="rad-list-img sm-img" src="https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/Nyan_cat_250px_frame.PNG/220px-Nyan_cat_250px_frame.PNG" alt="me" /></a>
                        <ul class="rad-dropmenu-item sm-menu">
                            <!-- <li class="rad-notification-item">
                                <a class="rad-notification-content lg-text" href="#"><i class="fa fa-edit"></i> My Profile</a>
                            </li> -->
                            <li class="rad-notification-item">
                                <!-- <a class="rad-notification-content lg-text"> -->
                                <!-- <GoogleLogin :params="params" :logoutButton=true class="logout-btn">
                                    <i class="fa fa-power-off"></i> <strong>Logout</strong>
                                </GoogleLogin></a> -->
                                <a class="rad-notification-content lg-text" @click.prevent="logOut"><i class="fa fa-power-off"></i> Sign out</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul class="pull-right links">
                    <!-- <li class="rad-dropdown"><a class="rad-menu-item" href="#"><i class="fa fa-bell-o"><span class="rad-menu-badge">49</span></i></a>
                        <ul class="rad-dropmenu-item">
                            <li class="rad-dropmenu-header"><a href="#">Your Alerts</a></li>
                            <li class="rad-notification-item text-left">
                                <a class="rad-notification-content" href="#">
                                    <div class="pull-left"><i class="fa fa-html5 fa-2x"></i>
                                    </div>
                                    <div class="rad-notification-body">
                                        <div class="lg-text">Introduction to fetch()</div>
                                        <div class="sm-text">The fetch API</div>
                                        <em class="pull-right sm-text"><i class="fa fa-clock-o"></i> 2 sec ago</em>
                                    </div>
                                </a>
                            </li>
                            <li class="rad-notification-item text-left">
                                <a class="rad-notification-content" href="#">
                                    <div class="pull-left"><i class="fa fa-bitbucket fa-2x"></i>
                                    </div>
                                    <div class="rad-notification-body">
                                        <div class="lg-text">Check your BitBucket</div>
                                        <div class="sm-text">Last Chance</div>
                                        <em class="pull-right sm-text"><i class="fa fa-clock-o"></i> 49 mins ago</em>
                                    </div>
                                </a>
                            </li>
                            <li class="rad-notification-item text-left">
                                <a class="rad-notification-content" href="#">
                                    <div class="pull-left"><i class="fa fa-google fa-2x"></i>
                                    </div>
                                    <div class="rad-notification-body">
                                        <div class="lg-text">Google Account</div>
                                        <div class="sm-text">sathishlxg@gmail.com</div>
                                        <em class="pull-right sm-text"><i class="fa fa-clock-o"></i> 2 days ago</em>
                                    </div>
                                </a>
                            </li>
                            <li class="rad-dropmenu-footer"><a href="#">See all alerts</a></li>
                        </ul>
                    </li> -->
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>
import GoogleLogin from 'vue-google-login';
export default {
    name: 'DashboardNav',
    data() {
        return {
            params: {
                client_id: "415938799508-oh4a2roef8rj6slbbvtlj8j40ebnothl.apps.googleusercontent.com"
            }
        }
    },
    components: {
        GoogleLogin
    },
    methods: {
        logOut() {
            var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                console.log('User signed out.');
            });
            this.$router.push('/login');
            localStorage.removeItem('jwt_token');
            this.$emit('session', false);
        }
    }
}
</script>

<style scoped>
.logout-btn {
    border: none;
    padding: 0;
    margin: 0;
    background-color: transparent;
    outline: none;
}
</style>