export const isAuth = async () => {
    return localStorage.getItem('logged')
}