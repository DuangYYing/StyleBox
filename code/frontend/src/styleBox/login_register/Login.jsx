import React, {Component} from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import "../../styles/tailwind.min.css"

import AuthenticationService from '../../api/styleBox/AuthenticationService';
import cookie from 'react-cookies'
import NavBar from "../../styleBox/navBar_footer/NavBar";
import NavBarAuthenticated from "../navBar_footer/NavBarAuthenticated";

const Container = tw(ContainerBase)`min-h-screen bg-pink-900 text-white font-medium flex justify-center mt-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold text-pink-900`;
const FormContainer = tw.div`w-full flex-1 mt-8`;


const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-pink-500 text-gray-100 w-full py-4 rounded-lg hover:bg-pink-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;

class Login extends Component {
  // -----------------Constructor--------------------
  constructor(props){
    super(props)

    this.state = {
      // login 参数
      username: '',
      password: '',
      hasLoginFailed: false,
      showSuccessMessage: false,
      showPassword: false
    }
    // bind 方法
    this.handleChange = this.handleChange.bind(this)
    this.loginClicked = this.loginClicked.bind(this)
    this.showPsw = this.showPsw.bind(this)
  }

  // -----------------Functions--------------------
  
  // 根据输入更改变量值
  handleChange(event) {
    this.setState(
        {
            [event.target.name]
                : event.target.value
        }
    )
  }

  showPsw(event){
      if(event.target.checked === true){
          this.setState({showPassword: true})
      }
      else{
          this.setState({showPassword: false})
      }
  }

  // submit btn function, 调用login method in AuthenticationService.js
  loginClicked(event) {
      console.log('Send username ' + this.state.username + 'password ' + this.state.password)
  
      event.preventDefault();
      AuthenticationService
      .executeJwtAuthenticationService(this.state.username, this.state.password)
      .then((response) => {
          // 处理前端返回的结果
          if (response.status === 200) {
              alert('Login successful !')
              console.log('login successfully with username' + this.state.username + ' and password ' + this.state.password)
              AuthenticationService.loginSuccessfulRegister(cookie.load)
              this.props.history.push(`/`)
          }            
      })
      .catch((error) => {
          this.setState({showSuccessMessage: false})
          this.setState({hasLoginFailed: true})
          alert(error.response.data.displayMessage)
      })
      
  }
  
  // -----------------Render--------------------
  render(){
    return(
      <AnimationRevealPage>
          <NavBarAuthenticated/>
        <Container>
          <Content>
            <MainContainer>
              <MainContent>
                <Heading>{"Login"}</Heading>
                <FormContainer>
                  <Form>
                    <Input type="text" name='username' placeholder='Enter Email or UserName Here' value={this.state.username} onChange={this.handleChange}/>
                    <Input type={this.state.showPassword?'text':'password'} name='password' placeholder='Enter Password Here' value={this.state.password} onChange={this.handleChange} />
                      <div className="w-48 grid grid-cols-2 mx-auto">
                          <p className="mt-4 text-xs text-gray-600 text-center">Show Password</p>
                          <Input type="checkbox" name='hiddenbox'onClick={this.showPsw}/>
                      </div>
                    <SubmitButton type="submit" onClick={this.loginClicked}> Login </SubmitButton>
                  </Form>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    <a href={"# "} tw="border-b border-gray-500 border-dotted">
                      Forgot Password ?
                    </a>
                  </p>
                  <p className="mt-8 text-sm text-gray-600 text-center">
                    Dont have an account?{" "}
                    <a href="/register" tw="border-b border-gray-500 border-dotted">
                      Register
                    </a>
                  </p>
                </FormContainer>
              </MainContent>
            </MainContainer>
          </Content>
        </Container>
      </AnimationRevealPage>
    )
  }

  


}

export default Login


