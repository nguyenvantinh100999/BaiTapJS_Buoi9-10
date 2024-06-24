export function tongLuong(chucVu, luongCoBan) {
  let tongLuong = 0;
  if (chucVu === "sep") {
    tongLuong = luongCoBan * 3;
  } else if (chucVu === "truongPhong") {
    tongLuong = luongCoBan * 2;
  } else if (chucVu === "nhanVien") {
    tongLuong = luongCoBan;
  } else {
    alert("Hãy chọn chức vụ hợp lệ");
  }
  return tongLuong;
}

export function xepLoai(gioLam) {
  let xepLoai = "";
  if (gioLam >= 80 && gioLam < 160) {
    xepLoai = "Nhân viên trung bình";
  } else if (gioLam >= 160 && gioLam < 176) {
    xepLoai = "Nhân viên khá";
  } else if (gioLam >= 176 && gioLam < 192) {
    xepLoai = "Nhân viên giỏi";
  } else if (gioLam >= 192 && gioLam <= 200) {
    xepLoai = "Nhân viên xuất sắc";
  } else {
    alert("Hãy nhập số giờ làm từ 80 - 200");
  }
  return xepLoai;
}
export function stringToSlug(title) {
  //Đổi chữ hoa thành chữ thường
  let slug = title.toLowerCase();
  //Đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
  slug = slug.replace(/đ/gi, "d");
  //Xóa các ký tự đặt biệt
  slug = slug.replace(
    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
    ""
  );
  //Đổi khoảng trắng thành ký tự gạch ngang
  slug = slug.replace(/ /gi, "-");
  //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
  slug = slug.replace(/\-\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-/gi, "-");
  slug = slug.replace(/\-\-/gi, "-");
  //Xóa các ký tự gạch ngang ở đầu và cuối
  slug = "@" + slug + "@";
  slug = slug.replace(/\@\-|\-\@|\@/gi, "");

  return slug;
}
