
package Dominio;

import java.sql.Date;
import org.joda.time.DateTime;


public class Actualizacion {
    
    private int idActualizacion;
    private Date fecha_actualizacion;
    private DateTime fechaActualizacion;
    private int id_estado;
    private int id_usuarios;
    private int id_consignacion;
    private String nombre_estado;
    private String nombre;
    private String num_recibo;
    private String fecha;

    public Actualizacion() {
    }

    public Actualizacion(int idActualizacion, String fechaActualizacion, String nombre_estado, String nombre, String num_recibo) {
        this.idActualizacion = idActualizacion;
        this.fecha = fechaActualizacion;
        this.nombre_estado = nombre_estado;
        this.nombre = nombre;
        this.num_recibo = num_recibo;
    }
    
    

    public Actualizacion(Date fecha_actualizacion, int id_estado, int id_usuarios) {
        this.fecha_actualizacion = fecha_actualizacion;
        this.id_estado = id_estado;
        this.id_usuarios = id_usuarios;
    }

    public Actualizacion(int id_estado, int id_usuarios) {
        this.id_estado = id_estado;
        this.id_usuarios = id_usuarios;
    }

    public int getId_consignacion() {
        return id_consignacion;
    }

    public void setId_consignacion(int id_consignacion) {
        this.id_consignacion = id_consignacion;
    }

    public String getNombre_estado() {
        return nombre_estado;
    }

    public void setNombre_estado(String nombre_estado) {
        this.nombre_estado = nombre_estado;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNum_recibo() {
        return num_recibo;
    }

    public void setNum_recibo(String num_recibo) {
        this.num_recibo = num_recibo;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }
    
    
    
    
    
    

    public int getIdActualizacion() {
        return idActualizacion;
    }

    public void setIdActualizacion(int idActualizacion) {
        this.idActualizacion = idActualizacion;
    }

    public Date getFecha_actualizacion() {
        return fecha_actualizacion;
    }

    public DateTime getFechaActualizacion() {
        return fechaActualizacion;
    }

    public void setFechaActualizacion(DateTime fechaActualizacion) {
        this.fechaActualizacion = fechaActualizacion;
    }
    

    public void setFecha_actualizacion(Date fecha_actualizacion) {
        this.fecha_actualizacion = fecha_actualizacion;
    }

    public int getId_estado() {
        return id_estado;
    }

    public void setId_estado(int id_estado) {
        this.id_estado = id_estado;
    }

    public int getId_usuarios() {
        return id_usuarios;
    }

    public void setId_usuarios(int id_usuarios) {
        this.id_usuarios = id_usuarios;
    }
    
    
    
    
}
