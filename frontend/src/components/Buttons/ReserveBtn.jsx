import { MdArrowOutward } from "react-icons/md";
import AnimateBtn from "./AnimateBtn";

const ReserveBtn = () => {
    return (
        <div className="relative z-49">
            <div className="absolute right-6 top-[2vw] w-[8.5vw] bg-[#E3000F] px-1 py-1 flex justify-end items-center rounded-4xl gap-2">
                <AnimateBtn btnName="Reverse"/>
                <MdArrowOutward className="bg-black text-white w-[2.5vw] h-auto rounded-full p-1" />
            </div>
        </div>
    )
}

export default ReserveBtn;