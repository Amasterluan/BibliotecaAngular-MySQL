import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: any = {}; // Para armazenar os dados do usuário
  userAddress: any = {}; // Para armazenar os dados de endereço
  isLoggedIn: boolean = false;
  
  editingUserData: boolean = false; // Controla se estamos editando os dados do usuário
  editingUserAddress: boolean = false; // Controla se estamos editando o endereço

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Verifica se o usuário está logado
    this.userService.isLoggedIn.subscribe((status) => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) {
        this.loadUserData();
      } else {
        this.router.navigate(['/user-auth']);
      }
    });
  
    this.userService.currentUser.subscribe((data) => {
      console.log('Dados do usuário recebidos:', data);  // Verifique os dados recebidos
      this.user = data;
      console.log('Dados do usuário no componente:', this.user);  // Verifique se os dados são atribuídos corretamente
    });
  }

  loadUserData() {
    const currentUser = this.userService.currentUser.getValue();
    if (currentUser) {
      this.user = currentUser; // Carrega os dados do usuário
      this.loadUserAddress(this.user.id);  // Passa o id para carregar o endereço
    }
  }

  loadUserAddress(userId: number) {
    console.log('Carregando endereço para o usuário com ID:', userId);  // Log para depuração
    this.userService.loadUserAddress(userId).subscribe(
      (address) => {
        console.log('Endereço carregado:', address);  // Log para depuração
        this.userAddress = address;
      },
      (error) => {
        console.error('Erro ao carregar o endereço:', error);
        // Verifica se a resposta de erro tem a mensagem "Endereço não encontrado"
        if (error.error.message === 'Endereço não encontrado para este usuário') {
          alert('Endereço não encontrado. Você pode adicionar um endereço agora.');
          // Você pode chamar um método para permitir o cadastro do endereço aqui
        } else {
          alert('Erro ao carregar o endereço!');
        }
      }
    );
  }
  

  editUserData() {
    this.editingUserData = true;
  }

  saveUserData() {
    this.userService.updateUserData(this.user).subscribe(
      (response) => {
        this.editingUserData = false;
        alert('Dados atualizados com sucesso!');
      },
      (error) => {
        console.error('Erro ao salvar dados:', error);
        alert('Erro ao atualizar os dados!');
      }
    );
  }

  editUserAddress() {
    this.editingUserAddress = true;
  }
  

  editOrSaveAddress(userId: number, addressForm: any) {
    console.log('Editando ou salvando endereço para o usuário com ID:', userId);
  
    this.userService.saveUserAddress(userId, addressForm).subscribe(
      (response: any) => {  // Define response como 'any' para evitar o erro
        console.log('Resposta do backend:', response);
        alert(response.message || 'Endereço atualizado com sucesso!');
      },
      (error) => {
        console.error('Erro ao salvar endereço:', error);
        alert('Erro ao salvar endereço. Tente novamente mais tarde.');
      }
    );
  }
  
  goToFavorites() {
    this.router.navigate(['/favorite']);
  }
}
