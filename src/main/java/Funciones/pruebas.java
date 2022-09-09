/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package Funciones;

import static Funciones.FuncionesGenerales.fechaSQL;
import java.sql.Date;
import java.text.Normalizer;
import java.text.SimpleDateFormat;
import org.joda.time.LocalDate;

/**
 *
 * @author DUVAN
 */
public class pruebas {

    public static void main(String[] args) {

        String fecha = "2022-06-01";
        Date f = fechaSQL(fecha, "yyyy-MM-dd");
        Date fech = voltearFecha(f);
        System.out.println(fech);
        System.out.println(limpiar("CASTAÑEDA DIAZ  ANDRES FELIPE"));

    }

    public static void fechaInicio() {
        LocalDate date = LocalDate.now();
        System.out.println(date);
    }

    public static Date voltearFecha(Date fecha) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-MM-yyyy");
        String formattedDate = simpleDateFormat.format(fecha);
        Date f = fechaSQL(formattedDate, "dd-MM-yyyy");
        return f;
    }

    public static String limpiarAcentos(String cadena) {
        String limpio = null;
        if (cadena != null) {
            String valor = cadena;
            valor = valor.toUpperCase();
            // Normalizar texto para eliminar acentos, dieresis, cedillas y tildes
            limpio = Normalizer.normalize(valor, Normalizer.Form.NFD);
            // Quitar caracteres no ASCII excepto la enie, interrogacion que abre, exclamacion que abre, grados, U con dieresis.
            limpio = limpio.replaceAll("[^\\p{ASCII}(N\u0303)(n\u0303)(\u00A1)(\u00BF)(\u00B0)(U\u0308)(u\u0308)]", "");
            // Regresar a la forma compuesta, para poder comparar la enie con la tabla de valores
            limpio = Normalizer.normalize(limpio, Normalizer.Form.NFC);
        }
        return limpio;
    }

    public static String limpiar(String datos) {
        String original = datos;
        String cadenaNormalize = Normalizer.normalize(original, Normalizer.Form.NFD);
        String cadenaSinAcentos = cadenaNormalize.replaceAll("[^\\p{ASCII}]", "");
        return cadenaSinAcentos;
    }

}
