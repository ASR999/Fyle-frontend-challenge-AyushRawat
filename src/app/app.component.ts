// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { userData } from './data/userData';
// import { usersType,workoutType } from "./types/workoutTypes";

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, FormsModule, CommonModule],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'Fyle Workout';

//   userData = userData;

//   name = '';
//   workoutType = '';
//   workoutMinutes: number | null = null;

//   nameFilter = '';
//   filteredUsers: usersType[] = [];

//   workoutTypes = ['Cycling', 'Swimming', 'Yoga', 'Running'];

//   addWorkout() {
//     if (this.name && this.workoutType && this.workoutMinutes) {
//       const newWorkout = {
//         id: this.userData.length + 1,
//         name: this.name,
//         workouts: [
//           {
//             type: this.workoutType,
//             minutes: this.workoutMinutes
//           }
//         ]
//       };
//       this.userData.push(newWorkout);
//       this.saveToLocalStorage();
//       this.resetForm();
//       this.filterUsers();
//     }
//   }

//   saveToLocalStorage() {
//     localStorage.setItem('userData', JSON.stringify(this.userData));
//   }

//   resetLocalStorage() {
//     localStorage.clear();
//     this.userData = [];
//     this.filteredUsers = []
//     this.name = '';
//     this.workoutType = '';
//     this.workoutMinutes = null;
//   }

//   resetForm() {
//     this.name = '';
//     this.workoutType = '';
//     this.workoutMinutes = null;
//   }

//   ngOnInit() {
//     const data = localStorage.getItem('userData');
//     if (data) {
//       this.userData = JSON.parse(data);
//       this.filteredUsers = this.userData.slice();
//     }
//   }

//   constructor() {
//     this.filteredUsers = this.userData.slice();
//   }

//   filterUsers() {
//     this.filteredUsers = this.userData.filter(user =>
//       user.name.toLowerCase().includes(this.nameFilter.toLowerCase()) &&
//       (!this.workoutType || user.workouts.some(workout => workout.type === this.workoutType))
//     );
//   }

//   clearFilters() {
//     this.nameFilter = '';
//     this.workoutType = '';
//     this.filteredUsers = this.userData.slice();
//   }

//   filterByWorkoutType() {
//     if (this.workoutType) {
//       this.filteredUsers = this.userData.filter(user =>
//         user.workouts.some(workout => workout.type === this.workoutType)
//       );
//     } else {
//       this.filteredUsers = this.userData.slice(); // Reset to all users
//     }
//   }

//   currentPage = 1;
//   itemsPerPage = 5;

//   get paginatedUsers() {
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     return this.filteredUsers.slice(startIndex, startIndex + this.itemsPerPage);
//   }

//   previousPage() {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//     }
//   }

//   nextPage() {
//     const totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
//     if (this.currentPage < totalPages) {
//       this.currentPage++;
//     }
//   }

//   getTotalUserWorkoutMinutes(user: usersType): number {
//     return user.workouts.reduce((total: number, workout: workoutType) => total + workout.minutes, 0);
//   }
// }


import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { userData } from './data/userData';
import { usersType, workoutType } from "./types/workoutTypes";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fyle Workout Tracker';

  userData = userData;

  name = '';
  workoutType = '';
  workoutMinutes: number | null = null;

  nameFilter = '';
  filteredUsers: usersType[] = [];

  workoutTypes = ['Cycling', 'Swimming', 'Yoga', 'Running'];

  // Adds a new workout to the list
  addWorkout() {
    if (this.name && this.workoutType && this.workoutMinutes) {
      const newWorkout = {
        id: this.userData.length + 1,
        name: this.name,
        workouts: [
          {
            type: this.workoutType,
            minutes: this.workoutMinutes
          }
        ]
      };
      this.userData.push(newWorkout);
      this.saveToLocalStorage();
      this.resetForm();
      this.filterUsers();
    }
  }

  // Saves the user data to local storage
  saveToLocalStorage() {
    localStorage.setItem('userData', JSON.stringify(this.userData));
  }

  // Resets all local storage data and clears the users
  resetLocalStorage() {
    localStorage.clear();
    this.userData = [];
    this.filteredUsers = [];
    this.name = '';
    this.workoutType = '';
    this.workoutMinutes = null;
  }

  // Clears the form inputs
  resetForm() {
    this.name = '';
    this.workoutType = '';
    this.workoutMinutes = null;
  }

  // Loads data from local storage when the component initializes
  ngOnInit() {
    const data = localStorage.getItem('userData');
    if (data) {
      this.userData = JSON.parse(data);
      this.filteredUsers = this.userData.slice();
    }
  }

  constructor() {
    this.filteredUsers = this.userData.slice();
  }

  // Filters users based on the name and workout type
  filterUsers() {
    this.filteredUsers = this.userData.filter(user =>
      user.name.toLowerCase().includes(this.nameFilter.toLowerCase()) &&
      (!this.workoutType || user.workouts.some(workout => workout.type === this.workoutType))
    );
  }

  // Clears the filters applied to the users
  clearFilters() {
    this.nameFilter = '';
    this.workoutType = '';
    this.filteredUsers = this.userData.slice();
  }

  // This method is not used but included for possible filtering by workout type
  filterByWorkoutType() {
    if (this.workoutType) {
      this.filteredUsers = this.userData.filter(user =>
        user.workouts.some(workout => workout.type === this.workoutType)
      );
    } else {
      this.filteredUsers = this.userData.slice(); // Reset to all users
    }
  }

  currentPage = 1;
  itemsPerPage = 5;

  // Retrieves the users to be displayed on the current page
  get paginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Moves to the previous page
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Moves to the next page
  nextPage() {
    const totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  // Calculates the total workout minutes for a user
  getTotalUserWorkoutMinutes(user: usersType): number {
    return user.workouts.reduce((total: number, workout: workoutType) => total + workout.minutes, 0);
  }
}
