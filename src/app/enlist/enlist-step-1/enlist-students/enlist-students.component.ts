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
	private _bathrooms = 1;

	constructor(private _enlistService: EnlistService) { }

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

	get bathrooms(): number {
		return this._bathrooms;
	}

	addBathroom(event) {
		if (this._bathrooms === 1) {
			this._bathrooms = 1;
		} else {
			this._bathrooms --;
		}
	}

	subBathroom(event) {
		if (this._bathrooms === 10) {
			this._bathrooms = 10;
		} else {
			this._bathrooms ++;
		}
	}
	
	onNext(): void {
		if (this._studentsForm.valid) {
			console.log(this._studentsForm);
			console.log(this._numberOfStudents);
			this._enlistService.students.nRooms = this._studentsForm.get('numberOfRooms').value;
			this._enlistService.students.nStudents = this._numberOfStudents;
			this._enlistService.bathrooms.nBathrooms = this._bathrooms;
			console.log(this._enlistService);
		}
	}
}
