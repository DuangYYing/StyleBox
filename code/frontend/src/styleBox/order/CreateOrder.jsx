import React, {Component} from 'react'
import "../../styles/tailwind.min.css"
import tw from 'twin.macro'
import NavBarCustomer from "../navBar_footer/NavBarCustomer";
import NavBarStylist from 'styleBox/navBar_footer/NavBarStylist';
import Footer from '../navBar_footer/Footer';
import CreateOrderForm from 'components/forms/CreateOrderForm';
import Cookies from 'react-cookies';
import NavBarAuthenticated from "../navBar_footer/NavBarAuthenticated";

const Button = tw.button`mx-8 mt-10 mt-8 md:mt-8 sm:w-32 mt-6 py-3 bg-pink-500 text-gray-100 rounded-full font-bold tracking-wide 
shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-pink-700 hocus:-translate-y-px hocus:shadow-xl
absolute left-1/2`;
// const PrimaryButton = styled(PrimaryButtonBase)(props => [
//     tw`w-56 mx-8 mt-10 mt-8 md:mt-8 text-sm inline-block bg-pink-500 hover:bg-gray-100 hover:text-pink-500 focus:bg-pink-500`,
//     props.buttonRounded && tw`rounded-full`
//   ]);

class CreateOrder extends Component {
    constructor(props) {
        super(props);

        this.state={

        }

        this.handleChange = this.handleChange.bind(this)
        this.submitInfo = this.submitInfo.bind(this)
        this.checkUser = this.checkUser.bind(this)
        this.back = this.back.bind(this)
    }


    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    submitInfo() {
        let info = {
            token: sessionStorage.getItem('token'),
            gender: this.state.gender,
            ftSize: this.state.ftSize,
            inSize: this.state.inSize,
            weight: this.state.weight,
            shirtSize: this.state.shirtSize,
            bottomSize: this.state.bottomSize,
            jeanSize: this.state.jeanSize,
            shoeSize: this.state.shoeSize,
            styleSet: this.state.styleSet.split(',')
        }
        console.log(this.state.styleSet)
        this.setState({edit: false})
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    checkUser(){
        return Cookies.get('role');
    }

    back(){
        this.props.history.push({
            pathname:'/stylist/homepage',
            query: {
                stylistId: this.props.location.state.stylistId,
            }
        })
    }


    render() {
        console.log(this.props.location)
        return (
            <div>
                <NavBarAuthenticated/>
                    {/* <div>stylist id: {this.props.stylistId}</div>
                    <div>stylist nickname: {state[1]}</div> */}
                    <CreateOrderForm stylist={this.props.location.state} history={this.props.history}/>
                    <Button onClick={this.back}>Back</Button>
                <Footer/>
            </div>
        )
    }
}

export default CreateOrder