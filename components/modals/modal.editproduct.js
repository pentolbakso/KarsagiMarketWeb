import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  Button,
  Icon,
  Label,
  Form,
  Message,
  Image,
} from "semantic-ui-react";
import { useConnect } from "remx";
import { Formik } from "formik";
import * as Yup from "yup";

// import sellerStore from "../../stores/sellerStore";
import * as sellerActions from "../../stores/sellerActions";
import { image200 } from "../../utils/images";
import { productCategories } from "../../config/arrays";

let imageFiles = []; //to upload

export default function ModalProduct({ product, ...props }) {
  //const { shop, products } = connect(props);
  const formRef = useRef();
  const inputFileRef = useRef(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [readyStock, setReadyStock] = useState(true);
  const [previewImages, setPreviewImages] = useState([]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Nama barang harap diisi"),
    price: Yup.number()
      .typeError("Harga harus berupa angka")
      .required("Harga barang harap diisi"),
    category: Yup.string().required("Kategori harap dipilih"),
    weight: Yup.number().typeError("Berat harus berupa angka"),
  });

  function handleSubmit() {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  }

  async function submitForm(values) {
    try {
      setSubmitting(true);

      // get original images that are not removed
      let existing = previewImages
        .filter((img) => img.file == null || img.file == undefined)
        .map((img) => {
          return {
            id: img.id,
            filename: img.filename,
            size: img.size,
          };
        });
      values.photos = existing;
      await Promise.all(
        imageFiles.map(async (file) => {
          const resp = await sellerActions.uploadImage(file);
          values.photos.push({
            id: resp._id,
            filename: resp.filename,
            size: resp.size,
          });
        })
      );

      values.isReadyStock = readyStock;
      if (product._id) await sellerActions.updateProduct(product._id, values);
      else await sellerActions.createProduct(values);
      setSubmitting(false);

      props.onClose(); //close modal
    } catch (err) {
      setSubmitting(false);
      setFormError(err.message);
    }
  }

  function handleFileSelected() {
    let file = inputFileRef.current.files[0];
    imageFiles.push(file);

    let url = URL.createObjectURL(file);
    setPreviewImages([
      ...previewImages,
      {
        url,
        file,
      },
    ]);
  }

  function handleRemovePhoto(img) {
    let images = previewImages.filter((p) => p.url != img.url);
    setPreviewImages(images);
    if (img.file) {
      imageFiles = imageFiles.filter((f) => f != img.file);
    }
  }

  useEffect(() => {
    if (!props.open) {
      // onClose
      imageFiles = [];
      // free memory of local images
      previewImages.forEach((img) => {
        if (img.file) {
          console.log("revoking image url: " + img.url);
          URL.revokeObjectURL(img.url);
        }
      });
    } else {
      //onOpen
      setFormError(null);
      if (product && product.photos) {
        let images = product.photos.map((p) => {
          return {
            id: p.id,
            filename: p.filename,
            size: p.size,
            url: image200(p.filename),
            file: null,
          };
        });
        setPreviewImages(images);
      } else {
        setPreviewImages([]);
      }

      setReadyStock(
        product.isReadyStock == undefined ? true : product.isReadyStock
      );
    }
  }, [props.open]);

  return (
    <Modal {...props}>
      {/* <Modal.Header>Tambah</Modal.Header> */}
      <Modal.Content>
        {product._id && <p>ID: {product._id}</p>}
        <Formik
          innerRef={formRef}
          initialValues={{
            name: product.name,
            description: product.description,
            category: product.category,
            price: product.price,
            promoPrice: product.promoPrice,
            weight: product.weight,
            notes: product.notes,
          }}
          validationSchema={validationSchema}
          onSubmit={submitForm}
        >
          {(props) => (
            <Form error={formError != null}>
              <Form.Field>
                <Label color={readyStock ? "green" : "red"}>
                  <Form.Checkbox
                    label="Stok READY!"
                    checked={readyStock}
                    onChange={() => setReadyStock(!readyStock)}
                  />
                </Label>
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Nama Barang"
                  name="name"
                  placeholder="misal: Madu Majalengka ORI"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.name}
                  error={props.errors.name}
                />
              </Form.Field>
              <Form.Field>
                <Form.TextArea
                  label="Deskripsi "
                  name="description"
                  placeholder="Penjelasan singkat mengenai barang, jumlah stok, akad jual beli, harga khusus grosir, garansi, dsb"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.description}
                  error={props.errors.description}
                  rows={10}
                />
              </Form.Field>
              <Form.Field>
                <Form.Select
                  label="Pilih Kategori "
                  name="category"
                  options={productCategories}
                  onChange={(e, data) => {
                    props.setFieldValue("category", data.value);
                  }}
                  onBlur={props.handleBlur}
                  value={props.values.category}
                  error={props.errors.category}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Harga (Rp)"
                  name="price"
                  placeholder="misal: 25000"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.price}
                  error={props.errors.price}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Harga Promo (Rp) *kosongkan jika tidak ada promo"
                  name="promoPrice"
                  placeholder=""
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.promoPrice}
                  error={props.errors.promoPrice}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Berat (gram)"
                  name="weight"
                  placeholder="Bebas, diisi atau tidak"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.weight}
                  error={props.errors.weight}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Catatan (max: 200 karakter)"
                  name="notes"
                  placeholder="Catatan utk calon pembeli (jika ada). Misal: baru/ bekas/ rusak etc"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.notes}
                  error={props.errors.notes}
                />
              </Form.Field>
              <Message error header="Gagal" content={formError} />
            </Form>
          )}
        </Formik>
        <p>
          <strong>Foto barang</strong>
          <p>
            Hanya untuk file gambar/photo. Bentuk foto ideal adalah KOTAK.
            Ukuran file maks: 5MB
          </p>
        </p>
        <Image.Group size="tiny">
          {previewImages.map((img, idx) => (
            <Image key={idx}>
              <Image src={img.url} bordered />
              <div style={{ textAlign: "center" }}>
                <a
                  href="#"
                  onClick={() => handleRemovePhoto(img)}
                  style={{ fontSize: 13, color: "#cc0000" }}
                >
                  <Icon name="close" /> Hapus
                </a>
              </div>
            </Image>
          ))}
          <Image>
            <Button
              onClick={() => inputFileRef.current.click()}
              style={{ fontSize: 24 }}
            >
              +
            </Button>
          </Image>
        </Image.Group>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={props.onClose}>Batal</Button>
        <Button
          type="submit"
          positive
          icon="checkmark"
          labelPosition="right"
          content="Simpan"
          onClick={handleSubmit}
          loading={isSubmitting}
        />
      </Modal.Actions>
      <input
        hidden
        id="fileUpload"
        ref={inputFileRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelected}
      />
    </Modal>
  );
}


