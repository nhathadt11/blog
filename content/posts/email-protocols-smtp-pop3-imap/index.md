---
title: "Gửi và nhận email bằng SMTP, POP3, IMAP"
date: 2022-10-06T16:05:26+07:00
draft: false
---

## **SMTP**

SMTP (Simple Mail Transfer Protocol, RFC 2821) là giao thức **gửi** email sử dụng kết nối TCP/IP - tin cậy nhưng không bảo mật bằng các ứng dụng email như MS Outlook, Thunder Bird, … tới các máy Email Server và giữa các Email Server với nhau. Email Server sử dụng port 25 mặc định để lắng nghe yêu cầu kết nối từ phía client. Để tăng tính bảo mật, nhà cung cấp dịch vụ email sẽ yêu cầu client gửi đến port 465 hay 587 trên kênh truyền SSL/TSL.

## **Quá trình email di chuyển trong MTS (Mail Transfer System) bằng SMTP**

Bản thân các ứng dụng gửi email đóng vai trò các MUA (Mail User Agent). Khi người thực hiện gửi, email sẽ được chuyển tới MSA (Mail Submit Agent) cũng chính là MTA (Mail Transfer Agent) biên đầu, thường thì MSA và MTA biên đầu cùng chạy trên một máy.

Email sau đó tiếp tục được chuyển tiếp (relay) thông qua các MTA trong một trường mạng cho tới khi chạm MTA biên cuối. MTA này có nhiệm vụ thực hiện truy vấn DNS để tìm ra MX (Mail Exchanger) Server thích hợp dựa trên tên miền đằng sau dấu @ (vd: @gmail.com) và chuyển tiếp tới các MX record có trong kết quả tìm được.

Email cuối cùng sẽ được chuyển và lưu trữ tại MDA (Mail Delivery Agent) theo định dạng mailbox. Vậy, nhiệm vụ SMTP là thực hiện vận chuyển email từ email client (MUA) tới hộp thư của người nhận (MDA).

{{< figure src="posts/email-protocols-smtp-pop3-imap/images/image1.png" title="Quá trình email di chuyển trong MTS (Mail Transfer System) bằng SMTP" >}}

Ngoài giao thức SMTP, còn có giao thức nào để gửi mail nào nữa hay không? Trả lời, HTTP, chúng ta vẫn hay soạn gửi email bằng trình duyệt đó thôi. Các nhà cung cấp dịch vụ thư điện tử như Yahoo! Mail hay Gmail là một ví dụ. Nhưng chỉ từ MUA tới MSA thôi, việc chuyển tiếp email từ MTA này qua MTA khác vẫn phải dùng SMTP.

## **POP3**

POP3 (Post Office Protocol version 3, RFC 1939) là giao thức nhận email, cho phép người dùng tải thư về máy, đọc và quản lý thư trên máy cục bộ. Thư sau khi tải về sẽ có thể được xóa khỏi máy chủ hoặc lưu trữ dưới dạng bản sao do dung lượng lưu trữ trên máy chủ hạn chế. POP3 sử dụng port mặc định là 110 để thực hiện thủ tục nhận mail. Tuy nhiên, có thể sử dụng port 995 để mã hóa kết nối trên kênh truyền SSL.

Thủ tục nhận mail trên POP3 diễn ra như sau:

- Người dùng thông qua Email Client gửi yêu cầu kết nối tới Email Server (MDA), quá trinh bắt tay 3 bước diễn ra để tạo kết nối TCP
- Email Server yêu cầu xác thực người dùng trước khi truy cập hộp thư
- Duyệt và tải email về máy (*)
- Người dùng thực hiện đọc, xóa hoặc lưu bản sao của email trên MDA (lưu ý, mọi thao tác bấy giờ chỉ là đánh dấu - mark) (*)
- Kết thúc phiên (lệnh QUIT), toàn bộ yêu cầu chỉnh sửa thực sự được thực thi (*)
- Email Server chủ động ngắt kết nối, giải phóng tài nguyên

## **IMAP**

IMAP (Internet Message Access Protocol, RFC 3501) cũng là giao thức nhận Email, ra đời sau POP3, hỗ trợ thêm nhiều tính năng và khắc phục được một số nhược điểm, do đó phức tạp hơn POP3. Dung lượng lưu trữ không còn là vấn đề lớn nên IMAP cho phép thư được giữ tại server, có thể tải về trên nhiều máy và được đồng bộ hóa dữ liệu với nhau. Điều này khiến việc thao tác chỉnh sửa biên tập trên ứng dụng Email được áp dụng đối với hòm thư ngay khi trực tuyến.

Hòm thư trên server được chia thành nhiều thư mục (hộp thư đến, thư đã gửi,…) và hỗ trợ người dùng tạo thư mục riêng. Với mỗi Email, IMAP cho phép gắn cờ để theo dõi trạng thái của thư đó và tải vể một phần hoặc toàn bộ. IMAP sử dụng port mặc định là 143, port cho kênh truyền mã hóa SSL là 993. Một phiên làm việc với IMAP cũng tương tự POP3, khác nhau ở các bước (*)

- Thực hiện duyệt email (theo cấu trúc thư mục và trạng thái), tải về đọc một phần hoặc toàn bộ email (bản sao)
- Mọi chỉnh sửa biên tập (xóa, di chuyển, thay đổi cờ,…) đều được áp dụng ngay sau khi thực hiện lệnh, miễn còn trong chế độ trực tuyến

## **Thực hiện gửi và nhận bằng giao thức SMTP và IMAP**

### Chuẩn bị

- 1 hoặc 2 tài khoản Email
    - Yahoo! Mail: [sender.happy@yahoo.com](mailto:sender.happyyahoo.com), password: **mysecr3t**
    - Gmail: [receiver.happy@gmail.com](mailto:receiver.happy@gmail.com), password: **mysecr3t**
- Thiết lập cho phép ứng dụng có tính bảo mật kém bảo mật hơn truy cập
    - Yahoo! Mail: Settings - Accounts Security - bật Allow apps that use less secure sign in
    - Gmail: Đăng nhập Gmail tại [https://myaccount.google.com/security](https://myaccount.google.com/security), Sign-in & Security – Sign in to Google, bật Allow less secure apps
- Công cụ hỗ trợ giao tiếp với SMTP server trên kênh SSL: **OpenSSL-0.9.8h-1** trong gói GnuWin32. Tải về tại [http://downloads.sourceforge.net/gnuwin32/openssl-0.9.8h-1-bin.zip](http://downloads.sourceforge.net/gnuwin32/openssl-0.9.8h-1-bin.zip), giải nén sẵn.

### Thực hiện

- Mở sẵn trang [https://www.base64encode.org/](https://www.base64encode.org/) để mã hóa base64 username và password
- Trong thư mục vừa giải nén, vào bin, mở **exe**

### Gửi Email với POP3 trên kênh truyền bảo mật SSL trên port 465

{{< figure src="posts/email-protocols-smtp-pop3-imap/images/image2.png" title="Thực hiện gửi mail bằng SMTP" >}}

### Nhận, đọc và chỉnh sửa biên tập Email với IMAP trên kênh truyền bảo mật SSL trên port 993

{{< figure src="posts/email-protocols-smtp-pop3-imap/images/imap-receive-1.png" title="Thực hiện nhận mail bằng IMAP - 1" >}}

{{< figure src="posts/email-protocols-smtp-pop3-imap/images/imap-receive-2.png" title="Thực hiện nhận mail bằng IMAP - 2" >}}

## **Tìm vết một Email (track down/trace)**

Chọn một Email trong hòm thư, xem nội dung đầy đủ bằng cách:

- Yahoo! Mail: More – View Raw Message
- Gmail: Click **Mũi tên trỏ xuống** cạnh nút **Reply** – Show Original

Quét khối chọn phần Email Header, copy phần này paste vào Trace Email Analyzer ở trang [http://whatismyipaddress.com/trace-email](http://whatismyipaddress.com/trace-email), nhấn Get Source. Server sẽ phân tích dữ liệu được gửi về, trả về kết quả là phần header đã gửi cùng với các dòng **Received:** được làm nổi bật. Qua một MTA, Email Header sẽ ghi thêm một **Received:** theo chiều từ dưới lên, thể hiện rõ qua các mốc thời gian. Do đó, chọn địa chỉ IP ở **Received:** cuối cùng Sử dụng dịch vụ whois trên trang [http://whois.arin.net/ui/](http://whois.arin.net/ui/) (ARIN là một Regional Internet Registry quản lý các tài nguyên mạng ở khu vưc Bắc Mỹ và một số quần đảo). Nếu IP tìm được ở khu vực châu Á, sử dụng whois tại [https://wq.apnic.net/whois-search/static/search.html](https://wq.apnic.net/whois-search/static/search.html).

## Tham khảo

- Computer Networking A Top-Down Approach 6th Edition – Kurose James F. & Ross Keith W
- [https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol)
- [https://busylog.net/telnet-imap-commands-note](https://busylog.net/telnet-imap-commands-note)