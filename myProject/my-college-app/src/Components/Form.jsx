import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from './Button';
import {Link} from 'react-router-dom';

export default function Form({ title, setPassword, setEmail, setConfirmPassword, handleAction, isLogin }) {
    return (
        <div className='my-[100px]'>
            <div className="heading-container">
                <h3 className='text-[#4abd5d] text-[20px] font-bold my-[20px]'>
                    {title} Form
                </h3>
            </div>

            <div className='mx-auto max-w-[350px] flex flex-col gap-[20px]'>
                <TextField
                    id="email"
                    type="text"
                    label="Email"
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {(!isLogin) && 
                    <TextField
                        id="confirm-password"
                        type="password"
                        label="Confirm Password"
                        variant="outlined"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                }
            </div>
            <div className='flex justify-center mt-[20px]'>
                <Button title={title} handleAction={handleAction}/>
            </div>

            {(isLogin) ?
            <p className='mt-[10px]'>Not have an account ?
                <Link to="/register" className='transition-all duration-300 ease-in text-[#4abd5d] hover:text-[#1DAD34] ml-[5px]'>
                Sign up here 
                </Link>
            </p>
            :
            <p className='mt-[10px]'>Already have an account ?
                <Link to="/login" className='transition-all duration-300 ease-in text-[#4abd5d] hover:text-[#1DAD34] ml-[5px]'>
                Sign In here 
                </Link>
            </p>
            }
        </div>
    );
}