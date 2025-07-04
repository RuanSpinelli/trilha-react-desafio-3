import { useNavigate  } from "react-router-dom";
import { MdEmail, MdLock, MdOutlinePerson } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';

import { useForm } from "react-hook-form";


import { Container, Title, Column, TitleLogin, SubtitleLogin, Row, Wrapper, P } from './styles';

const Cadastro = () => {

    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors  } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

const onSubmit = async (formData) => {
    try {
        const response = await api.post('/users', {
            nome: formData.nome,
            email: formData.email,
            senha: formData.senha,
        });

        if (response.status === 201 || response.status === 200) {
            alert("Usuário cadastrado com sucesso!");
            navigate('/login'); // Ou pra onde você quiser
        } else {
            alert("Erro ao cadastrar. Tente novamente.");
        }
    } catch (e) {
        console.error("Erro no cadastro:", e);
        alert("Erro no servidor. Tente novamente mais tarde.");
    }
};


    console.log('errors', errors);

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                 e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                <TitleLogin>Faça seu cadastro</TitleLogin>
                <SubtitleLogin>Crie sua conta e comece sua jornada com a gente._</SubtitleLogin>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                    placeholder="Nome completo"
                    leftIcon={<MdOutlinePerson />}
                    name="nome"
                    control={control}
                    rules={{ required: "Nome é obrigatório" }}
                    />
                    {errors.nome && <span style={{ color: 'red' }}>{errors.nome.message}</span>}

                    <Input
                    placeholder="E-mail"
                    leftIcon={<MdEmail />}
                    name="email"
                    control={control}
                    rules={{ required: "E-mail é obrigatório" }}
                    />
                    {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}

                    {errors.email && <span>E-mail é obrigatório</span>}
                    <Input
                        type="password"
                        placeholder="Senha"
                        leftIcon={<MdLock />}
                        name="senha"
                        control={control}
                        rules={{ required: "Senha é obrigatória" }}
                        />
                    {errors.senha && <span style={{ color: 'red' }}>{errors.senha.message}</span>}
                    <Button title="Criar minha conta" variant="secondary" type="submit"/>
                </form>
                <Row>
                    <P>Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.</P>
                </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Cadastro }