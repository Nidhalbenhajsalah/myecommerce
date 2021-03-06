import React, {useState, useEffect} from 'react'
import {Paper, Stepper, Step, StepLabel, Typography} from '@material-ui/core'
import useStyles from './styles'
import AdressForm from '../AdressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';

const steps=['Shipping adress', 'Payment details'];

const Checkout = ({cart, order, onCaptureCheckout, error}) => {

    const [activeStep, setActiveStep]=useState(0);
    const [checkoutToken, setCheckouToken]= useState(null);
    const [shippingData, setShippingData]= useState({})
    const classes=useStyles();

    useEffect(() => {
        const generateToken = async ()=>{
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
                setCheckouToken(token);
            }catch (error){

            }
        }

        generateToken();
    }, [cart])


    const nextStep=()=> setActiveStep((prevActiveStep)=>prevActiveStep+1);
    const backStep=()=> setActiveStep((prevActiveStep)=>prevActiveStep-1);

    const next = (data)=>{
        setShippingData(data);
        nextStep()
    }

    const Confirmation =()=>(
        <div>Confirmation</div>
    )

    const Form=()=>activeStep===0
        ?<AdressForm checkoutToken={checkoutToken} next={next} />
        :<PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} onCaptureCheckout={onCaptureCheckout}/>
    return (
        <>
            <div className={classes.toolbar}/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={0} className={classes.stepper}>
                        {steps.map((step)=>(
                            <Step key={{step}}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep===steps.length ? <Confirmation/> : checkoutToken && <Form/>}
                </Paper>

            </main>
        </>
    )
}

export default Checkout
