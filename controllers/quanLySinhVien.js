import { NhanVien } from "../models/NhanVien.js";
import { xepLoai, tongLuong, stringToSlug } from "../util/method.js";

let arrNhanVien = [];
document.querySelector("#btnThemNV").onclick = function (e) {
  e.preventDefault();
  let nv = new NhanVien();
  let arrInput = document.querySelectorAll(
    ".modal-body .form-group .input-group .form-control"
  );
  for (let input of arrInput) {
    let id = input.id;
    let value = input.value;
    nv[id] = value;
  }
  nv.loaiNhanVien = xepLoai(nv.gioLam);
  nv.tongLuong = tongLuong(nv.chucVu, nv.luongCB);
  console.log(nv);
  arrNhanVien.push(nv);
  console.log(arrNhanVien);
  rendertableNhanVien(arrNhanVien);
  //sau khi thêm sinh viên vào mảng thì lưu mảng storage
  saveLocalstorage();
};

window.rendertableNhanVien = function (arrNV) {
  //input là mảng
  let htmlString = "";
  for (let nv of arrNV) {
    htmlString += `
      <tr>
          <td>${nv.taiKhoan}</td>
          <td>${nv.hoTen}</td>
          <td>${nv.email}</td>
          <td>${nv.ngayLam}</td>
          <td>${nv.chucVu}</td>
          <td>${nv.tongLuong}</td>
          <td>${nv.loaiNhanVien}</td>
          <td>
            <button class="btn btn-primary"  data-toggle="modal"
                    data-target="#myModal" onclick="chinhSua('${nv.taiKhoan}')">Chỉnh sửa</button>
            <button class="btn btn-danger" onclick="xoaNhanVien('${nv.taiKhoan}')">Xóa</button>
            </td>
      </tr>
    `;
  }
  //ouput: in ra giao diện html
  document.querySelector("tbody").innerHTML = htmlString;
  return htmlString;
};

window.xoaNhanVien = (taiKhoan) => {
  let indexDel = arrNhanVien.findIndex((nv) => nv.taiKhoan === taiKhoan);
  if (indexDel !== -1) {
    ////nếu tìm thấy nhân viên có mã = với mã của nút click thì xóa nhân viên đó trong mảng
    arrNhanVien.splice(indexDel, 1);
  }
  console.log(arrNhanVien);
  rendertableNhanVien(arrNhanVien); //sau khi xóa xong thì render lại table nhân viên từ mảng mới
};

window.chinhSua = (taiKhoan) => {
  document.querySelector("#taiKhoan").disabled = true;
  let nvUpdate = arrNhanVien.find((nv) => nv.taiKhoan === taiKhoan);
  console.log(nvUpdate);
  console.log(nvUpdate.gioLam);
  if (nvUpdate) {
    //load nhân viên lên thẻ form
    for (let key in nvUpdate) {
      console.log(key, nvUpdate[key]);
      // document.querySelector(`#${key}`).value = nvUpdate[key];
      let inputElement = document.querySelector(`#${key}`);
      if (inputElement) {
        inputElement.value = nvUpdate[key];
      } else {
        console.log(`No input element found with id: ${key}`);
      }
    }
  }
};

document.querySelector("#btnCapNhat").onclick = function (e) {
  let nvEdit = new NhanVien();
  let arrInput = document.querySelectorAll(
    ".modal-body .form-group .input-group .form-control"
  );
  for (let input of arrInput) {
    let id = input.id;
    let value = input.value;
    nvEdit[id] = value;
  }
  nvEdit.tongLuong = tongLuong(nvEdit.chucVu, nvEdit.luongCB);
  nvEdit.loaiNhanVien = xepLoai(nvEdit.gioLam);
  let nvTrongMang = arrNhanVien.find((nv) => nv.taiKhoan === nvEdit.taiKhoan);
  if (nvTrongMang) {
    for (let key in nvTrongMang) {
      nvTrongMang[key] = nvEdit[key];
    }
    console.log(nvTrongMang);
    rendertableNhanVien(arrNhanVien);
  }
};

document.querySelector("#btnTimNV").onclick = function (e) {
  e.preventDefault();
  // console.log(123);
  //input: keyword
  let tuKhoa = document.querySelector("#searchName").value;
  tuKhoa = stringToSlug(tuKhoa);
  let arrNVTimKiem = [];
  //output: arr được filter theo từ khóa
  arrNVTimKiem = arrNhanVien.filter(
    (nv) => stringToSlug(nv.xepLoai).search(tuKhoa) !== -1
  );
  console.log(arrNVTimKiem);
  //sau khi filter thì dùng mảng kết quả render lại table
  rendertableNhanVien(arrNVTimKiem);
};
window.saveLocalstorage = function () {
  //Biến đổi mảng thành string [] => "[]"
  let strNhanVien = JSON.stringify(arrNhanVien);
  // console.log(first)
  localStorage.setItem("arrNhanVien", strNhanVien);
};

// window.LoadLocalStorage = function () {
//   if (localStorage.getItem("arrNhanVien")) {
//     //[]
//     let strNhanVien = localStorage.getItem("arrNhanVien");
//     arrNhanVien = JSON.parse(strNhanVien);
//     renderTableNhanVien(arrNhanVien);
//   }
// };
// LoadLocalStorage();
