import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EnlistService } from '../../enlist.service';

@Component({
	selector: 'app-enlist-students',
	templateUrl: './enlist-students.component.html',
	styleUrls: ['./enlist-students.component.scss']
})
export class EnlistStudentsComponent implements OnInit {
	private _numberOfStudents = 5;
	private _studentsForm: FormGroup;

	constructor(private enlistService: EnlistService) { }

	ngOnInit() {
		this._studentsForm = new FormGroup({
			'numberOfRooms': new FormControl('5')
		});
	}

	get numberOfStudents(): number {
		return this._numberOfStudents;
	}

	get studentsForm(): FormGroup {
		return this._studentsForm;
	}

	studentsMinus(event) {
		if (this._numberOfStudents === 1) {
			this._numberOfStudents = 1;
		} else {
			this._numberOfStudents --;
		}
	}

	studentsPlus(event) {
		if (this._numberOfStudents === 20) {
			this._numberOfStudents = 20;
		} else {
			this._numberOfStudents ++;
		}
	}

	onNext(): void {
		if (this._studentsForm.valid) {
			console.log(this._studentsForm);
			console.log(this._numberOfStudents);
			this.enlistService.students.nRooms = this._studentsForm.get('numberOfRooms').value;
			this.enlistService.students.nStudents = this._numberOfStudents;
			console.log(this.enlistService);
		}
	}
}
