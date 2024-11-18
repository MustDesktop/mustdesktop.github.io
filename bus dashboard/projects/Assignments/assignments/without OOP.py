Students = []

def ADD_student(code, name, city):
    student = {"Code": code, "Name": name, "id":id, "Town": town, "Gpa": gpa}
    Students.append(student)
    print(f"Added student: {name}")

def DELETE_student(code):
    for student in Students:
        if student["Code"] == code:
            Students.remove(student)
            print(f"Deleted student with code: {code}")
            return
    print("Student not found.")

def DISPLAY_students():
    if not Students:
        print("No students in the system.")
    else:
        print("Students:")
        for student in Students:
            print(f"Code: {student['Code']}, Name: {student['Name']}, id: {student['id']}, Town: {student['Town']}, Gpa:{student['Gpa']}")

while True:
    Operation = input("\nPress: 1->Add Student, 2->Delete Student, 3->Display Students, 4->Exit: ")

    if Operation == '1':
        code = input("Enter student code: ")
        name = input("Enter student name: ")
        id = input("Enter id: ")
        town = input("Enter town: ")
        gpa = input("Enter Gpa: ")
        ADD_student(code, name, town)

    elif Operation == '2':
        code = input("Enter student code to delete: ")
        DELETE_student(code)

    elif Operation == '3':
        DISPLAY_students()

    elif Operation == '4':
        print("Exiting the system.")
        break

    else:
        print("Invalid option. Please try again.")