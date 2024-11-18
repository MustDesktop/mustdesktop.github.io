class Student:
    def __init__(self, code, name, student_id):
        self.code = code
        self.name = name
        self.id = student_id
        self.town = town

    def __str__(self):
        return f"Code: {self.code}, Name: {self.name}, ID: {self.id}, Town: {self.town}"


class StudentManagementSystem:
    def __init__(self):
        self.students = []

    def add_student(self, code, name, student_id, town):
        student = Student(code, name, student_id, town)
        self.students.append(student)
        print(f"Added student: {name}")

    def delete_student(self, code):
        for student in self.students:
            if student.code == code:
                self.students.remove(student)
                print(f"Deleted student with code: {code}")
                return
        print("Student not found.")

    def display_students(self):
        if not self.students:
            print("No students in the system.")
        else:
            print("Students:")
            for student in self.students:
                print(student)


system = StudentManagementSystem()

while True:
    operation = input("\nPress: 1->Add Student, 2->Delete Student, 3->Display Students, 4->Exit: ")

    if operation == '1':
        code = input("Enter student code: ")
        name = input("Enter student name: ")
        student_id = input("Enter student ID: ")
        town = input("Enter Town: ")
        system.add_student(code, name, student_id, town)

    elif operation == '2':
        code = input("Enter student code to delete: ")
        system.delete_student(code)

    elif operation == '3':
        system.display_students()

    elif operation == '4':
        print("Exiting the system.")
        break

    else:
        print("Invalid option. Please try again.")