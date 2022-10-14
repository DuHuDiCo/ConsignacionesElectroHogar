package Datos;

import Dominio.Actualizacion;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import org.joda.time.DateTime;

public class DaoActualizacion {

    private static final String SQL_INSERT_ACTUALIZACION = "INSERT INTO actualizacion(fecha_actualizacion, id_estado, id_usuarios) VALUES (NOW(),?,?)";
    private static final String SQL_INSERT_ACTUALIZACIONIDCONSIGNACION = "INSERT INTO actualizacion(fecha_actualizacion, id_estado, id_usuarios, id_consignacion) VALUES (NOW(),?,?,?)";
    private static final String SQL_SELEC_IDACTUALIZACION = "SELECT MAX(idActualizacion) FROM actualizacion ";
    private static final String SQL_SELECT_IDESTADO = "SELECT id_estado FROM actualizacion WHERE idActualizacion = ?";
    private static final String SQL_ACTUALIZARCONSIGNACIONCONIDCONSIGNACION = "UPDATE actualizacion SET id_consignacion = ? WHERE idActualizacion = ?";
    private static final String SQL_OBTENERTODASACTUALIZACIONESBYIDCONSIGNACION = "SELECT actualizacion.idActualizacion, actualizacion.fecha_actualizacion, estado.nombre_estado, usuario.nombre, consignacion.num_recibo FROM actualizacion INNER JOIN estado ON actualizacion.id_estado = estado.idEstado INNER JOIN usuario ON actualizacion.id_usuarios = usuario.idUsuario INNER JOIN consignacion ON actualizacion.id_consignacion = consignacion.idConsignacion WHERE id_consignacion = ?;";

    public int guardarActualizacion(Actualizacion actu) throws ClassNotFoundException, SQLException {
        Connection con = null;
        PreparedStatement stmt = null;

        int rown = 0;
        try {
            con = Conexion.getConnection();
            stmt = con.prepareStatement(SQL_INSERT_ACTUALIZACION);

            stmt.setInt(1, actu.getId_estado());
            stmt.setInt(2, actu.getId_usuarios());

            rown = stmt.executeUpdate();

        } catch (SQLException ex) {
            ex.printStackTrace(System.out);
        } finally {
            Conexion.close(con);
            Conexion.close(stmt);

        }

        if (rown == 1) {
            return obtenerIdActualizacion();
        } else {
            return rown;
        }

    }

    public int guardarActualizacionWithIdConsignacion(Actualizacion actu) throws ClassNotFoundException, SQLException {
        Connection con = null;
        PreparedStatement stmt = null;

        int rown = 0;
        try {
            con = Conexion.getConnection();
            stmt = con.prepareStatement(SQL_INSERT_ACTUALIZACIONIDCONSIGNACION);

            stmt.setInt(1, actu.getId_estado());
            stmt.setInt(2, actu.getId_usuarios());
            stmt.setInt(3, actu.getId_consignacion());

            rown = stmt.executeUpdate();

        } catch (SQLException ex) {
            ex.printStackTrace(System.out);
        } finally {
            Conexion.close(con);
            Conexion.close(stmt);

        }

        if (rown == 1) {
            return obtenerIdActualizacion();
        } else {
            return rown;
        }

    }

    public int actualizarActualizacion(int actu, int idConsignacion) throws ClassNotFoundException, SQLException {
        Connection con = null;
        PreparedStatement stmt = null;

        int rown = 0;
        try {
            con = Conexion.getConnection();
            stmt = con.prepareStatement(SQL_ACTUALIZARCONSIGNACIONCONIDCONSIGNACION);

            stmt.setInt(1, idConsignacion);
            stmt.setInt(2, actu);

            rown = stmt.executeUpdate();

        } catch (SQLException ex) {
            ex.printStackTrace(System.out);
        } finally {
            Conexion.close(con);
            Conexion.close(stmt);

        }

        return rown;

    }

    public int obtenerIdActualizacion() throws ClassNotFoundException, SQLException {
        Connection con = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        int rown = 0;
        try {
            con = Conexion.getConnection();
            stmt = con.prepareStatement(SQL_SELEC_IDACTUALIZACION);

            rs = stmt.executeQuery();

            while (rs.next()) {
                int idActualizacion = rs.getInt("MAX(idActualizacion)");

                rown = idActualizacion;
            }

        } catch (SQLException ex) {
            ex.printStackTrace(System.out);
        } finally {
            Conexion.close(con);
            Conexion.close(stmt);

        }
        return rown;
    }

    public int obtenerIdEstadoByIdActualizacion(int idActu) throws ClassNotFoundException, SQLException {
        Connection con = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        int rown = 0;
        try {
            con = Conexion.getConnection();
            stmt = con.prepareStatement(SQL_SELECT_IDESTADO);
            stmt.setInt(1, idActu);

            rs = stmt.executeQuery();

            while (rs.next()) {
                int idEstado = rs.getInt("id_estado");

                rown = idEstado;
            }

        } catch (SQLException ex) {
            ex.printStackTrace(System.out);
        } finally {
            Conexion.close(con);
            Conexion.close(stmt);

        }
        return rown;
    }

    public List<Actualizacion> obtenerActualizacionesByIdConsignacion(int idConsignacion) throws ClassNotFoundException {
        Connection con = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        List<Actualizacion> actualizaciones = new ArrayList<>();

        try {
            con = Conexion.getConnection();
            stmt = con.prepareStatement(SQL_OBTENERTODASACTUALIZACIONESBYIDCONSIGNACION);
            stmt.setInt(1, idConsignacion);

            rs = stmt.executeQuery();

            while (rs.next()) {
                int idActualizacion = rs.getInt("idActualizacion");
                String fecha_actualizacion = rs.getString("fecha_actualizacion");
               
                String nombre_estado = rs.getString("nombre_estado");
                String nombre = rs.getString("nombre");
                String num_recibo = rs.getString("num_recibo");

                Actualizacion actu = new Actualizacion(idActualizacion, fecha_actualizacion, nombre_estado, nombre, num_recibo);
                actualizaciones.add(actu);

            }

        } catch (SQLException ex) {
            ex.printStackTrace(System.out);
        } finally {
            Conexion.close(con);
            Conexion.close(stmt);

        }
        return actualizaciones;
    }


}
