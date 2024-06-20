const API_BASE_URL = 'http://localhost:3001/users';


export async function registerUser(userData) {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    console.log(userData ,"suerrrrr data");
    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error('Failed to register');
  }
}
export async function loginUser(email, password) {
    console.log(email,password)
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
  
      const users = await response.json();
      console.log('Users', users);
       
      const user = users.find(u => u.email === email && u.password === password);
      console.log('User', user);
  
      if (!user) {
        throw new Error('Invalid email or password');
      }
  
      localStorage.setItem('userId', user.id);
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Failed to login');
    }
  }
  
  export async function fetchUserData(id = null) {
    try {
      if (!id) {
        id = localStorage.getItem('userId');
        if (!id) {
          throw new Error('No user ID found in local storage');
        }
      }
  
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
  
      const user = await response.json();
      return user;
    } catch (error) {
      console.error('Fetch user data error:', error);
      throw new Error('Failed to fetch user data');
    }
  }
  export function logoutUser() {
    localStorage.removeItem('userId');
    window.location.href = '/'; 
  }