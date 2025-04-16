import { Link } from "react-router";
export default function Home() {

    return (
        <div>
            <div className=" text-center bg-white m-auto w-[600px] py-10 rounded-lg shadow-lg mb-[250px] my-[50px]">
                <h1 className="text-5xl text-orange-950 font-bold m-0 mx-10 mb-2">Welcome to Leil's Guitar Listing App!!</h1>
                <p className="text-lg mb-16 w-[400px] m-auto">Where you can upload your whishlist of guitars that you always wanted!</p>
                    <div >
                        <div className= "flex justify-center mb-10 gap-5">
                            <Link to="/signup" className='bg-orange-500 text-white font-bold p-2 rounded-xl'>Register Now!</Link>
                        </div>
                        <div className="flex justify-center  gap-[10px]">
                            <p>Already have an account? </p>
                            <Link to="/signin" className=' text-[#5F8B4C] underline font-bold  rounded-3xl'>Sign In</Link>
                        </div>
                    </div>
            </div>
        </div>
    );
}