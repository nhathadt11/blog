---
title: "Unix v7 Filesystem"
date: 2022-10-06T16:05:26+07:00
draft: false
---

## Filesystem

UNIX v7 Filesystem có cấu trúc cơ bản là một **Tree Graph** với gốc là root directory. Các node là file và directory. Trong đó, các internal node là directory và leaf là file và empty directory. Vì filesystem (không chỉ riêng UNIX) cho phép tạo các link (Windows là shortcut) để truy cập file từ nhiều nơi khác nhau nên cấu trúc hoàn chỉnh UNIX filesystem là một **Acyclic Graph**.

## UNIX Directory và Directory Entry

UNIX directory là một bảng danh sách chứa các file và directory khác. Mỗi entry trong bảng sẽ bao gồm một cặp 2 giá trị key và value. Trong đó, key là i-node number, đóng vai trò là identifier cho một i-node (2 bytes) và value chính là filename (14 bytes).

Vì vậy, filename lưu trữ được tối đa 14 ký tự trong bảng mã ASCII, trừ ký tự “/” – được dùng để ngăn cách các thành phần trong pathname, và NUL (giá trị số là 0) được dùng để lấp vào các byte trống khi filename không đủ 14 bytes. Một UNIX directory luôn có 2 entry: một có i-node number là chính nó và filename là “.”, cái còn lại có i-node number của parent directory và filename là “..”.

{{< figure src="posts/unix-v7-filesystem/images/image1.png" title="I-node" >}}


### I-node (Index-node)

I-node là 1 dạng cấu trúc dữ liệu của các hệ điều hành thuộc họ UNIX. I-node được dùng để lưu trữ metadata của một file hay directory và quản lí lưu trữ dữ liệu của file hay directory đó. Dựa trên 2 chức năng trên của i-node, có thể chia i-node thành 2 thành phần chính: vùng **Attribute** và vùng **Disk Address**.

Khác với việc phải nạp toàn bộ FAT (File Allocation Table) vào bộ nhớ như Windows, các hệ điều hành thuộc họ UNIX chỉ cần nạp i-node của file đang được mở. Kích thước của một i-node rất nhỏ so với bảng FAT nên việc này giúp bộ nhớ được tối ưu hóa đi rất nhiều.

Với đặc điểm chỉ-nạp-khi-mở, sẽ có trường hợp tất cả file được mở tại cùng một thời điểm, mặc dù trường hợp này rất hiếm và hầu như không có trong thực tế. Thế nhưng hệ thống vẫn áp dụng một giải pháp đơn giản cho trường hợp này bằng cách giới hạn số file được mở cùng lúc.

### Attribute

Vùng Attribute của i-node là nơi chứa metadata của file (directory) bao gồm: thông tin bảo vệ, chủ sở hữu, nhóm được cấp quyền, 3 điểm thời gian lúc tạo lập, lần cuối truy cập và lần chỉnh sửa gần đậy nhất, kích thước file (directory), số lượng disk block và một bộ đếm số các directory entry đang trỏ tới. Sở dĩ có bộ đếm này là vì các links giúp truy cập nhanh 1 file ở nhiều thư mục khác (như khái niệm Shortcut của Windows). Khi một link được tạo hay xóa, bộ đếm sẽ tăng hay giảm tương ứng.

| Protection mode | Thông tin các quyền truy cập file |
| --- | --- |
| Owner & Group | Chủ sở hữu và nhóm được cấp quyền |
| Timestamp (3) | Creation, last access, last modification |
| Length (in bytes) | Kích thước file tính bằng byte |
| Block count | Số lượng các disk block chứa nội dung của file |
| Link (reference) count | Số lượng các directory entry chứa i-node number |

### Disk Address: data block và pointer block

Vùng Disk Address của i-node được chia thành các entry có kích thước như nhau.Như tên gọi, mỗi entry không chứa trực tiếp dữ liệu mà chứa địa chỉ của 1 data block của file (directory) trên đĩa, số lượng của entry là hằng số và bằng nhau cho mọi i-node trong một hệ thống. Khi file được mở, i-node của file đó được nạp vào bộ nhớ và file sẵn sàng được đọc.

Ví dụ về một i-node có **10 disk address** (**4 bytes** được dùng lưu 1 address) và kích thước của 1 data block là **1KB** ta dễ dàng tính được kích thước tối đa của một file là 10KB. Thực tế, con số 10KB là rất nhỏ so với những gì mà chúng ta thường thấy ở một file. Vậy, làm sao có thể lưu trữ được những file có kích thước lớn hơn 10KB với ví dụ trên bằng cách sử dụng i-node.

Giải pháp thứ nhất, tăng kích thước data block. Nếu tăng kích thước của data block lên 10MB, một file sẽ có kích thước lên tới 100MB. Nhưng liệu vậy có đủ, những media file thậm chí có kích thước tính bằng GB. Giả sử có một con số nào đó cho data block giúp i-node có thể quản lí được bất cứ file có kích thước lớn cỡ nào nhưng trên disk có nhiều file có kích thước nhỏ, internal fragment là điều không thể tránh khỏi. Vậy trên thực tế, không tồn tại con số nào như thế cả.

Giải pháp thứ hai ở đây là sẽ có một hoặc nhiều disk address cuối, thay vì là địa chỉ của data block sẽ là địa chỉ của block các pointer. Lúc này disk address cho data block được gọi là direct address, địa chỉ của block các pointer sẽ là single indirect address, double indirect address hay triple indirect address tùy thuộc vào số lần nó phải tham chiếu để đến data block.

Quay lại với bài toán đưa ra ở trên nhưng giờ chỉ có 7 direct address, 1 single indirect address, 1 double indirect address và 1 triple indirect address, kích thước lớn nhất của file lúc này là: 1KBx7 + 1KB x256 + 1KBx256^2 + 1KBx256^3 = 16GB (với 256 = 1024/4 là số pointer trong một block). Và đây là giải pháp được áp dung trong thực tế đối với i-node.

{{< figure src="posts/unix-v7-filesystem/images/image2.png" title="Data block và Disk block" >}}

## Dùng i-node và directory entry để tìm file location

Với i-node và directory entry, hệ thống có thể dể dàng tìm được một file thông qua absolute pathname. Ví dụ, làm sao hệ điều hành có thể tìm được file text.txt thông qua đường dẫn tuyệt đối /usr/ast/mbox.

Như đã nêu trên, Unix file system là cơ bản là một đồ thị hình cây có gốc là root directory. Root chứa tập hợp các entry và hệ thống sẽ tìm ra entry có filename là usr với i-node tương ứng là 6. Đi tới i-node 6 thấy “/usr” nằm tại block 132. Tiếp tục tìm kiếm trong “/usr” directory thấy “/usr/ast” có i-node 26. I-node 26 cho biết “/usr/ast” ở block 406. Block 406 giúp hệ thống biết được mbox có i-node 60. Cuối cùng hệ điều hành sẽ nạp i-node vào bộ nhớ và kết thúc tìm kiếm.

Quá trình trên sẽ không thành công nếu 1 directory entry trong lúc tìm kiếm không tồn tại. Hệ điều hành sẽ thông báo “No such file or directory”.

{{< figure src="posts/unix-v7-filesystem/images/image3.png" title="Dùng i-node và directory entry để tìm file location" >}}

## Tham khảo

- Modern Operating Systems 4th Edition by Andrew Tanenbaum and Herbert Bos