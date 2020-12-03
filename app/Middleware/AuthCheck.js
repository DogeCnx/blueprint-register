'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class AuthCheck {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({request,auth,response }, next) {
    try{
      console.log("Pass")
      await auth.check()
    }
    catch(e){
      console.log("Stupid",e)
      return response.send({status : 400 ,error : "pls login"})
    }
    await next()
  }
}

module.exports = AuthCheck
