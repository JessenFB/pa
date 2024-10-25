import React from "react";

const Home = React.lazy(()=>import("./hello"))
const Product = React.lazy(()=>import("./product"))
const Registrasi = React.lazy(()=>import("./registrasi"))

const routes = [
    { path:"/", Component : Home},
    { path:"/product",Component : Product},
    { path:"/registrasi",Component : Registrasi}
];

export default routes;