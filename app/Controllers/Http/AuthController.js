'use strict'
const User = use('App/Models/User');


class AuthController {
  async register({request, auth}) {

    let user = await User.create(request.body)

    await user.save()

    let accessToken = await auth.generate(user)
    return {status : 200 , user: user , access_token : accessToken }
  }

  async login({request, auth}) {
    const {username ,password } = request.body

    try {
      if (await auth.attempt(username, password)) {
        let user = await User.findBy('username', username)
        let accessToken = await auth.generate(user)
        return {status : 200 , user: user , access_token : accessToken }
      }
    }
    catch (error) {
      return {status : 200 , error : error.toString() }
    }
  }

  async logout({auth ,request}){

    const { refreshToken } = request.body.access_token

    await auth.authenticator('jwt').revokeTokens([refreshToken], true)
    return {status : 200 ,data : "complate"}
  }

  async test (){
    return {hello : "complate"}
  }

}

module.exports = AuthController
