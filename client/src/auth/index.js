
export const isLoggedIn = () => {
let data=localStorage.getItem("data");
if (data != null) return true;
else return false;
};

export default isLoggedIn;