<?php

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    header("Location: index.html");
}

require 'phpmailer/PHPMailer.php';
require 'phpmailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;

$nombre = $_POST['nombre'];
$apellidoP = $_POST['apellido_paterno'];
$apellidoM = $_POST['apellido_materno'];
$email = $_POST['email'];
$telefono = $_POST['telefono'];
$mensaje = $_POST['mensaje'];

if(empty(trim($nombre))) $nombre = "Anonimo";
if(empty(trim($apellidoP))) $apellidoP = "";
if(empty(trim($apellidoM))) $apellidoM = "";
if(empty(trim($mensaje))) $mensaje = "Mensaje no proporcionado";

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

$mailer = new PHPMailer();
$mailer->setFrom($email, "$nombre $apellidoP");
$mailer->addAddress('flowerstudio@outlook.es');
$mailer->Subject = 'Nuevo mensaje de contacto';
$mailer->msgHTML($body);
$mailer->AltBody = strip_tags($body);
$rta = $mailer->send( );

var_dump($rta);