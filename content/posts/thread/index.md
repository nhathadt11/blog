---
title: "Thread"
date: 2022-10-06T18:42:01+07:00
draft: false
---

**Thread** là một phần của process, nhằm mục đích hạn chế thời gian context switch của process và tận dụng tối đa thời gian ma CPU giành cho process để xử lí nhiều hơn một chức năng của process đó.

## **Đặc điểm của thread**

- Nhiều thread tạo thành một chuỗi tuần tự các lềnh trong một process cần được thực thi
- Sử dụng chung vùng không gian địa chỉ và tài nguyên phần cứng của process chứa nó
- Mỗi thread có vùng stack, thanh ghi PC và các thanh ghi khác
- Không có sự phân cách giữa các thread trong cùng 1 process
- Có thể chứa một số thuộc thính của process (lightweight process)
- Multithreading

## **Có 2 cách thực thi thread**

### **User space**

Toàn bộ thread chỉ nằm và được xử lý trong vùng của user và chỉ user mới nhận biết được, vùng kernel chỉ biết process. Để quản lí các thread, hệ thống sẽ sử dụng thread table nằm trong process ở thành phần user. Thread table sẽ nắm giữ thông tin thread nào đang ở trạng thái nào sẵn sàng được chạy (ready) và thread nào chưa (block).
1. *Ưu điểm:*
    - Vì các thành phần trong context switch của thread chỉ bao gồm thanh ghi PC, thanh ghi trạng thái, con trỏ stack, và một số thanh ghi khác nên việc chuyển đổi diễn ra nhanh hơn nhiều so với process
    - Vì đặc điểm giống như một mini-process, các thuật giải cho process cũng được áp dụng cho thread
2. *Nhược điểm:*
    - Việc block system call của thread là khó khan vì kernel không nhận diện được nó. Do đó, thay vi chỉ block các thread cần thiết thì cả process sẽ bị block
    - Vì lí do người lập trình muốn sự chính xác trong phần mềm, việc system call xảy ra liên tục là điều khó tránh khỏi

### **Kernel**

Hệ thống cho phép thành phần kernel nhận diện thread và thread table nằm vùng kernel. Thread được tạo mới và xóa bỏ ngay tại kernel. Một số hệ thống cải thiện thời gian bằng cách sử dụng lại thread đã bị xóa bỏ. Thực tế, bằng cách này, thread không thực sự bị xóa đi trong một khoảng thời gian nhất định nào đó, mà đơn giản nó được đánh dấu là không còn được sử dụng. Khi vẫn còn đang trong thời gian đánh dấu, thread có thể được tái sử dùng nếu cần mà không cần phải tạo mới.

1. *Ưu điểm:*
    - Kernel có thẻ chuyển đổi giữa các thread của các process khác nhau
2. *Nhược điểm:*
    - Tốn thời gian và tài Nguyên để quản lý thread
    - Khi thread được tạo mới và lưu trữ chậm vì cần thực hiện system call

## Tham khảo

- Modern Operating Systems 4th Edition by Andrew Tanenbaum and Herbert Bos