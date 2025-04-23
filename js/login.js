const registerBtn = document.querySelector('.register-button')
const loginBtn = document.querySelector('.login-button')

registerBtn.onclick = () => {
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    const confirmPassword = document.querySelector('#confirm-password').value

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) {
        alert('Email không hợp lệ')
        return
    }

    if (password !== confirmPassword) {
        alert('Mật khẩu không khớp')
        return
    }

    const terms = document.querySelector('#terms').checked

    if (!terms) {
        alert('Bạn phải đồng ý với các điều khoản và điều kiện')
        return
    }

    const users = JSON.parse(localStorage.getItem('users')) || []

    if (users.some((user) => user.email === email)) {
        alert('Email đã tồn tại')
        return
    }

    // Tạo user mới với role mặc định là 'user'
    const newUser = {
        id: Date.now().toString(),
        email,
        password,
        role: 'user',
        username: email.split('@')[0],
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    alert('Đăng ký thành công')
    window.location.href = 'login.html'
}

loginBtn.onclick = () => {
    const email = document.querySelector('#login-email').value
    const password = document.querySelector('#login-password').value

    const users = JSON.parse(localStorage.getItem('users')) || []
    const user = users.find((user) => user.email === email && user.password === password)

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user))
        if (user.role === 'admin') {
            window.location.href = 'admin.html'
        } else {
            window.location.href = 'index.html'
        }
    } else {
        alert('Email hoặc mật khẩu không chính xác')
    }
}
