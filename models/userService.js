exports.CheckCredential = async (username,password) =>
{
    const user = ({user_name:process.env.ADMIN_USER,password:process.env.ADMIN_PASS});
    if (!user)
        return false;
    let checkPass =(username == user.user_name && password == user.password);
    if (checkPass)
        return user;
    return false;
}
exports.getUser = async () =>
{
    const user = ({user_name:process.env.ADMIN_USER,password:process.env.ADMIN_PASS});
    return user;
}