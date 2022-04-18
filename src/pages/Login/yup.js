import * as yup from 'yup';

export const userInfor = yup.object({
    firstName: yup.string().required("Vui lòng nhập họ tên!"),
    lastName: yup.string().required("Vui lòng nhập họ tên!"),
    email: yup.string().email("Email không hợp lệ"),
    password: yup.string().required("Vui lòng nhập mật khẩu").min(8,"Tối thiểu 8 ký tự")
})