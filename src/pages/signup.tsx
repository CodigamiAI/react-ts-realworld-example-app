// This file simply re-exports the Register page under an explicit `signup`
// route so that both `/register` (legacy / RealWorld spec) **and** `/signup`
// (design mock terminology) point to the exact same component implementation.

import Register from "./register";

export default Register;
