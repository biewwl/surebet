// import { Icon } from "@iconify/react/dist/iconify.js";
import "./styles/Loading.css";

function Loading() {
  return (
    <div className="loading">
      {/* <Icon icon="line-md:loading-twotone-loop" /> */}
      <div class="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loading;
