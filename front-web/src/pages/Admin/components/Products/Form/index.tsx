import React, { useState } from "react";
import { makePrivateRequest } from "core/utils/request";
import BaseForm from "../../BaseForm";
import "./styles.scss";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import history from "core/utils/history";

type FormState = {
  name: string;
  price: string;
  description: string;
  imageUrl: string;
};

const Form = () => {
  const { register, handleSubmit, errors } = useForm<FormState>();

  const onSubmit = (data: FormState) => {
    makePrivateRequest({ url: "/products", method: "POST", data })
    .then(()=>{
      toast.info('Produto salvo com sucesso!');
      history.push('/admin/products');
    })
    .catch(()=>{
      toast.error('Erro ao salvar produto!');
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseForm title="cadastrar um produto">
        <div className="row">
          <div className="col-6">
            <div className="margin-bottom-30">
              <input
                ref={register({ 
                  required: "Campo obrigatório",
                  minLength: {value:5,message:"O campo deve ter no mínimo 5 caracteres"},
                  maxLength: {value:60,message:"O campo deve ter no máximo 60 caracteres"}
                  
                 })}
                type="text"
                name="name"
                className="form-control input-base"
                placeholder="Nome do Produto"
              />
              {errors.name && (
                <div className="invalid-feedback d-block">
                  {errors.name.message}
                </div>
              )}
            </div>
            <div className="margin-bottom-30">
              <input
                ref={register({
                   required: "Campo obrigatório",
                    
                  })}
                type="text"
                name="price"
                className="form-control  input-base"
                placeholder="Price"
              />
              {errors.price && (
                <div className="invalid-feedback d-block">
                  {errors.price.message}
                </div>
              )}
            </div>
            <div className="margin-bottom-30">
              <input
                ref={register({ required: "Campo obrigatório" })}
                type="text"
                name="imageUrl"
                className="form-control input-base"
                placeholder="Imagem do Produto"
              />
              {errors.imageUrl && (
                <div className="invalid-feedback d-block">
                  {errors.imageUrl.message}
                </div>
              )}
            </div>
          </div>

          <div className="col-6">
            <textarea
              ref={register({ required: "Campo obrigatório" })}
              name="description"
              placeholder="Descrição"
              className="form-control input-base"
              cols={30}
              rows={10}
            ></textarea>
            {errors.description && (
              <div className="invalid-feedback d-block">
                {errors.description.message}
              </div>
            )}
          </div>
        </div>
      </BaseForm>
    </form>
  );
};

export default Form;
