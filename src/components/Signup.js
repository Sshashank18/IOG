import React from 'react'
import '../styles/Signup.css'

function Signup() {
    return (
        <div>
            <section class="login-block">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-12">
                            <form class="md-float-material form-material" action="#" method="POST">
                                <div class="auth-box card">
                                    <div class="card-block">
      
                                        {/* <div class="form-group form-primary">

                                            <input type="text" class="form-control" name="first_name" value="" placeholder="Display name" id="first_name"/>
                                        </div>

                                        <div class="form-group form-primary">
                                            <input type="text" class="form-control" name="email" value="" placeholder="Email" id="email"/>

                                        </div>

                                        <div class="form-group form-primary">
                                            <input type="password" class="form-control" name="password" placeholder="Password" value="" id="password"/>

                                        </div>

                                        <div class="form-group form-primary">
                                            <input type="password" class="form-control" name="password_confirm" placeholder="Repeat password" value="" id="password_confirm"/>

                                        </div>


                                        <div class="row">
                                            <div class="col-md-12">

                                                <input type="submit" class="btn btn-primary btn-md btn-block waves-effect text-center m-b-20" name="submit" value="Signup Now"/>
                                            </div>
                                        </div>

                                        <div class="or-container"><div class="line-separator"></div> <div class="or-label">or</div><div class="line-separator"></div></div> */}


                                        <div class="row">
                                            <div class="col-md-12">
                                                <a class="btn btn-lg btn-google btn-block text-uppercase btn-outline" href="http://localhost:1300/users/auth/google"><img src="https://img.icons8.com/color/16/000000/google-logo.png"/> Signup Using Google</a>

                                            </div>
                                        </div>
                                        <br/>

                                            <p class="text-inverse text-center">Already have an account? <a href="http://localhost:1300/users/auth/google" data-abc="true">Login</a></p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Signup
