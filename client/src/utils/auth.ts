import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {    
    if (this.loggedIn()) {
      return jwtDecode(this.getToken());
    }
  }
  loggedIn() {    
    const token = this.getToken();

    if (token?.length > 0 && !this.isTokenExpired(token)) {      
      return true;
    }
    
    return false;
  }
  
  isTokenExpired(token: string) {    
    const decodedToken = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;    
    return !(decodedToken?.exp && decodedToken.exp > currentTime);    
  }

  getToken(): string {
    const token = localStorage.getItem('token');

    return token ?? '';    
  }

  login(idToken: string) {
    localStorage.setItem('token', idToken);

    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('token');
    window.location.assign('/loginpage');
  }
}

export default new AuthService();
