<?php

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    header("Location: index.html");
}

$nombre = $_POST['nombre'];
$apellidoP = $_POST['apellido_paterno'];
$apellidoM = $_POST['apellido_materno'];
$email = $_POST['email'];
$telefono = $_POST['telefono'];
$mensaje = $_POST['mensaje'];

if(empty(trim($nombre))) $nombre = "Anonimo";
if(empty(trim($apellidoP))) $apellidoP = "";
if(empty(trim($apellidoM))) $apellidoM = "";

$body = <<<HTML
<h1>Nuevo mensaje de contacto</h1>
<p><strong>Nombre:</strong> $nombre</p>
<p><strong>Apellido Paterno:</strong> $apellidoP</p>
<p><strong>Apellido Materno:</strong> $apellidoM</p>
<p><strong>Email:</strong> $email</p>
<p><strong>Teléfono:</strong> $telefono</p>
<p><strong>Mensaje:</strong> $mensaje</p>
HTML;

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: $nombre $apellidoP <$email>" . "\r\n";

$var_dump($nombre, $apellidoP, $apellidoM, $email, $telefono, $mensaje);
$rta = mail('flowerstudios@outlook.es', 'Nuevo mensaje de contacto', $body, $headers);
$var_dump($rta);