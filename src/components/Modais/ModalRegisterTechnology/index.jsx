import { useForm } from "react-hook-form";
import { Input } from "../../Input";
import { StyleModalRegisterTechnologyForm } from "./style";
import { formRegisterTechnologySchema } from "../../../services/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useParams } from "react-router-dom";
import { StyledButton } from "../../../styles/button";
import { api } from "../../../services/api";
import { StyledTitleThree } from "../../../styles/typography";
import { useState } from "react";
import { toast } from "react-toastify";

export const ModalRegisterTechnology = ({ isShowModal, setIsShowModal }) => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formRegisterTechnologySchema),
  });
  const navigate = useNavigate();

  const handleRegisterTechnology = async (data) => {
    
    try {
      const registerTechnologyOk = await api.post("/users/techs", data);
      console.log(registerTechnologyOk)
      toast.success("Tecnologia cadastrada com sucesso");
      setIsShowModal(!isShowModal);
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  

  return (
    <StyleModalRegisterTechnologyForm
      onSubmit={handleSubmit(handleRegisterTechnology)}
    >
      <div className={isShowModal ? "formTitle" : "hidden"}>
        <StyledTitleThree fontSize="threeOne">
          Cadastrar Tecnologia
        </StyledTitleThree>
        <button onClick={() => setIsShowModal(!isShowModal)}>X</button>
      </div>
      <fieldset className={isShowModal ? "fieldsetModal" : "hidden"}>
        <Input
          type="text"
          id="title"
          label="Nome"
          placeholder="Digite o nome da technologia"
          error={errors.title?.message}
          {...register("title")}
        />

        <p className="statusSelect">Selecionar status</p>
        <div className="statusFormRegister">
          <select {...register("status")}>
            <option value="Iniciante">Iniciante</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Sênior">Sênior</option>
          </select>
          <p>{errors.status?.message}</p>
        </div>
      </fieldset>
      
        <StyledButton
          className={isShowModal ? "buttonRegisterTechnologia" : "hidden"}
          type="submit"
          buttonSize="mobile"
          buttonStyle="primary"
        >
          Cadastrar Tecnológia
        </StyledButton>
      
    </StyleModalRegisterTechnologyForm>
  );
};
