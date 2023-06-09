import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Course} from '../../norm/entity/course';
import {Teacher} from '../../norm/entity/Teacher';
import {CourseService} from '../../service/course.service';
import {Klass} from '../../norm/entity/Klass';
import {UniqueNameValidator} from '../validator/unique-name-validator';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {
  @ViewChild('linkToIndex', {static: true})
  linkToIndex: ElementRef;

  formGroup: FormGroup;
  course: Course;

  constructor(private formBuilder: FormBuilder,
              private courseService: CourseService,
              private uniqueNameValidator: UniqueNameValidator) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.minLength(2), Validators.required],
        this.uniqueNameValidator.validate]
  });
    this.course = new Course();
  }

  onTeacherSelect($event: Teacher) {
    this.course.teacher = $event;
  }

  onSubmit() {
    this.course.name = this.formGroup.get('name').value;
    this.courseService.save(this.course).subscribe((course) => {
      console.log(course);
      this.goToIndex();
    });
  }
  goToIndex(): void {
    this.linkToIndex.nativeElement.click();
  }
/*传入多个id*/
  onKlassesChange($event: Klass[]) {
    this.course.klasses = $event;
  }
}
