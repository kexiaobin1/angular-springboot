package com.mengyunzhi.springbootstudy.controller;

import com.mengyunzhi.springbootstudy.entity.Student;
import com.mengyunzhi.springbootstudy.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 学生控制器
 */
@RestController
@RequestMapping("Student")
public class StudentController {

    @Autowired
    StudentService studentService;

    @GetMapping
    public Page<Student> findAll(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String sno,
            @RequestParam(required = false) Long klassId,
            @RequestParam int page,
            @RequestParam int size) {
        return this.studentService.findAll(
                name,
                sno,
                klassId,
                PageRequest.of(page, size));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Student save(@RequestBody Student student) {
        return studentService.save(student);
    }

    @GetMapping("{id}")
    public Student getById(@PathVariable Long id) {
        return this.studentService.findById(id);
    }

    @PutMapping("{id}")
    public Student update(@PathVariable Long id,@RequestBody Student student) {
        return this.studentService.update(id, student);
    }
    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Long id) {
        this.studentService.deleteById(id);
    }
    @DeleteMapping("/batch-delete")
    public void bathDelete(@RequestParam List<Long> ids) {
        this.studentService.deleteByIn(ids);
    }
}
