const API_REGISTER = '/api/register';
const API_LOGIN = '/api/login';
const API_PROFILE = '/api/profile';
const API_LOGOUT = '/api/logout';

// ============ РЕГИСТРАЦИЯ ============
if (window.location.pathname.endsWith('register.html')) {
  const form = document.getElementById('registerForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = form.username.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const error = document.getElementById('reg-error');
    error.textContent = '';

    try {
      const res = await fetch(API_REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        error.textContent = data.error || 'Ошибка регистрации';
      } else {
        window.location.href = 'profile.html';
      }
    } catch (err) {
      console.error(err);
      error.textContent = 'Сервер не отвечает';
    }
  });
}

// ============ ВХОД ============
if (window.location.pathname.endsWith('login.html')) {
  const form = document.getElementById('loginForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const error = document.getElementById('login-error');
    error.textContent = '';

    try {
      const res = await fetch(API_LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        error.textContent = data.error || 'Неверные данные';
      } else {
        window.location.href = 'profile.html';
      }
    } catch (err) {
      console.error(err);
      error.textContent = 'Ошибка соединения';
    }
  });
}

// ============ ПРОФИЛЬ ============
if (window.location.pathname.endsWith('profile.html')) {
  fetch(API_PROFILE)
    .then(res => res.json())
    .then(data => {
      if (!data.profile) {
        window.location.href = 'index.html';
        return;
      }
      const p = data.profile;
      document.getElementById('nameField').innerText = p.name || '-';
      document.getElementById('emailField').innerText = p.email || '-';
      document.getElementById('bioField').innerText = p.bio || '-';
      if (p.photoPath) {
        const img = document.getElementById('avatarImg');
        img.src = p.photoPath;
        img.hidden = false;
      }
    })
    .catch(err => console.error('Ошибка загрузки профиля:', err));

  const logout = document.getElementById('logoutBtn');
  if (logout) {
    logout.addEventListener('click', async () => {
      await fetch(API_LOGOUT);
      window.location.href = 'index.html';
    });
  }
}

// ============ РЕДАКТИРОВАНИЕ ПРОФИЛЯ ============
if (window.location.pathname.endsWith('edit-profile.html')) {
  const form = document.getElementById('editProfileForm');

  fetch(API_PROFILE)
    .then(res => res.json())
    .then(data => {
      if (!data.profile) return;
      const p = data.profile;
      form.name.value = p.name || '';
      form.bio.value = p.bio || '';
    });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    if (!formData.get('newPassword')) {
      formData.delete('newPassword');
    }
    try {
      const res = await fetch(API_PROFILE, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Ошибка при сохранении');
      } else {
        window.location.href = 'profile.html';
      }
    } catch (err) {
      console.error(err);
      alert('Ошибка соединения');
    }
  });
}
