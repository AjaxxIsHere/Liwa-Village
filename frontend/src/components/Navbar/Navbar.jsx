import { IoMdMenu } from "react-icons/io";
import AnimateBtn from "../Buttons/AnimateBtn";

const Navbar = () => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-fit h-10 p-1 flex items-center justify-end gap-2 bg-[#E3000F] rounded-4xl z-50 cursor-pointer group transition-all duration-500">
      <div>
        <div className="pl-4 text-white">
          <AnimateBtn btnName="Menu" />
        </div>
      </div>
      <div className="bg-white rounded-full p-2">
        <IoMdMenu className="text-[#E3000F] transition-transform duration-500 group-hover:rotate-[360deg]" />
      </div>
    </div>
  );
};

export default Navbar;
