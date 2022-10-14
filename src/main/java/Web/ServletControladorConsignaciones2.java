package Web;

import Datos.DaoActualizacion;
import Datos.DaoConsignaciones;
import Datos.DaoConsignaciones2;
import Datos.DaoEstados;
import Datos.DaoObservacion;
import Datos.DaoSedes;
import Datos.DaoUsuarios;
import Dominio.Actualizacion;
import Dominio.Consignacion;
import Dominio.Observaciones;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Date;
import java.sql.SQLException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.joda.time.LocalDate;

@WebServlet(urlPatterns = {"/ServletControladorConsignaciones2"})
public class ServletControladorConsignaciones2 extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        String accion = req.getParameter("accion");

        if (accion != null) {
            switch (accion) {
                case "consignacionesMesCartera": {
                    try {
                        this.consignacionesMesCartera(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    } catch (SQLException ex) {
                        Logger.getLogger(ServletControladorConsignaciones2.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "consignacionesDiaCartera": {
                    try {
                        this.consignacionesDiaCartera(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    } catch (SQLException ex) {
                        Logger.getLogger(ServletControladorConsignaciones2.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "consignacionesMesCaja": {
                    try {
                        this.consignacionesMesCaja(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;

                case "consignacionesDiaCaja": {
                    try {
                        this.consignacionesDiaCaja(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "consignacionesAplicadasCaja": {
                    try {
                        this.consignacionesAplicadasCaja(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    } catch (SQLException ex) {
                        Logger.getLogger(ServletControladorConsignaciones2.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "consignacionesMesContabilidad": {
                    try {
                        this.consignacionesMesContabilidad(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "consignacionesDiaContabilidad": {
                    try {
                        this.consignacionesDiaContabilidad(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    } catch (SQLException ex) {
                        Logger.getLogger(ServletControladorConsignaciones2.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "consignacionesComprobadas": {
                    try {
                        this.consignacionesComprobadas(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "cancelarConsignacion": {
                    try {
                        this.cancelarConsignacion(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    } catch (SQLException ex) {
                        Logger.getLogger(ServletControladorConsignaciones2.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "cancelarCambiosIndividual": {
                    try {
                        this.cancelarCambiosIndividual(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    } catch (SQLException ex) {
                        Logger.getLogger(ServletControladorConsignaciones2.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "validarConsignacion": {
                    try {
                        this.validarConsignacion(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    } catch (SQLException ex) {
                        Logger.getLogger(ServletControladorConsignaciones2.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "listarConsignacionesFechaValor": {
                    try {
                        this.listarConsignacionesFechaValor(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    } catch (SQLException ex) {
                        Logger.getLogger(ServletControladorConsignaciones2.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "validarIfExist": {
                    try {
                        this.validarIfExist(req, resp);
                    } catch (ClassNotFoundException | SQLException ex) {
                        Logger.getLogger(ServletControladorConsignaciones2.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "validarEstado": {
                    try {
                        this.validarEstado(req, resp);
                    } catch (ClassNotFoundException | SQLException ex) {
                        Logger.getLogger(ServletControladorConsignaciones2.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "validarIfExistContabilidad": {
                    try {
                        this.validarIfExistContabilidad(req, resp);
                    } catch (ClassNotFoundException | SQLException ex) {
                        Logger.getLogger(ServletControladorConsignaciones2.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "obtenerConsignacionesBySede": {
                    try {
                        this.obtenerConsignacionesBySede(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones2.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "obtenerConsignacionesBySedeByEstadoByFecha": {
                    try {
                        this.obtenerConsignacionesBySedeByEstadoByFecha(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones2.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "obtenerConsignacionesByEstadoAndFecha": {
                    try {
                        this.obtenerConsignacionesByEstadoByFecha(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones2.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "obtenerConsignacionesByFecha": {
                    try {
                        this.obtenerConsignacionesByFecha(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones2.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                 case "obtenerConsignacionesSede": {
                    try {
                        this.obtenerConsignacionesSede(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones2.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                 case"obtenerConsignacionesSedeByFecha":
                {
                    try {
                        this.obtenerConsignacionesSedeByFecha(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones2.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                     break;
                 case "traerActualizaciones":
                {
                    try {
                        this.traerActualizaciones(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones2.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                     break;

                case "validarConsignacionesCajaTemporal":
                {
                    try {
                        this.validarConsignacionesCajaTemporal(req, resp);
                    } catch (ClassNotFoundException | SQLException ex) {
                        Logger.getLogger(ServletControladorConsignaciones2.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                    break;
                case "validarConsignacionesContabilidadTemporal":
                {
                    try {
                        this.validarConsignacionesContabilidademporal(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones2.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                    break;    
                case "validarExistenciaByRecibo":
                {
                    try {
                        this.validarExistenciaByRecibo(req, resp);
                    } catch (ClassNotFoundException | SQLException ex) {
                        Logger.getLogger(ServletControladorConsignaciones2.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                    break;

                    

            }
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        String accion = req.getParameter("accion");

        if (accion != null) {
            switch (accion) {
                case "actualizarConsignaciones": {
                    try {
                        this.actualizarConsignaciones(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    } catch (SQLException ex) {
                        Logger.getLogger(ServletControladorConsignaciones2.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "devolverConsignacionCaja": {
                    try {
                        this.devolverConsignacionCaja(req, resp);
                    } catch (ClassNotFoundException | SQLException ex) {
                        Logger.getLogger(ServletControladorConsignaciones2.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                
            }
        }
    }

    private void consignacionesMesCartera(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, SQLException, IOException {
        HttpSession session = req.getSession(true);
        String email = (String) session.getAttribute("usuario");
        int id_usuario = new DaoUsuarios().obtenerIdUsuario(email);
        String fechaInicio = Funciones.FuncionesGenerales.fechaInicioMes();
        String fechaFin = Funciones.FuncionesGenerales.fechaFinMes();

        List<Consignacion> congs = new DaoConsignaciones().listarConsignacionesMesByIdUsuario(fechaInicio, fechaFin, id_usuario);

        resp.setContentType("text/plain");

        PrintWriter out = resp.getWriter();

        out.print(congs.size());
        out.flush();
    }

    private void consignacionesDiaCartera(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, SQLException, IOException {
        HttpSession session = req.getSession(true);
        String email = (String) session.getAttribute("usuario");
        int id_usuario = new DaoUsuarios().obtenerIdUsuario(email);
        LocalDate date = LocalDate.now();
        String today = date.toString();

        List<Consignacion> congs = new DaoConsignaciones().listarConsignacionesDiaByIdUsuario(id_usuario, today);

        resp.setContentType("text/plain");

        PrintWriter out = resp.getWriter();

        out.print(congs.size());
        out.flush();
    }

    private void consignacionesMesCaja(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, IOException {
        HttpSession session = req.getSession(true);
        String email = (String) session.getAttribute("usuario");
        String fechaInicio = Funciones.FuncionesGenerales.fechaInicioMes();
        String fechaFin = Funciones.FuncionesGenerales.fechaFinMes();
        String sede = new DaoUsuarios().obtenerSedeUsuario(email);

        List<Consignacion> congs = new DaoConsignaciones().listarConsignacionesMesBySede(sede, fechaInicio, fechaFin);

        resp.setContentType("text/plain");

        PrintWriter out = resp.getWriter();

        out.print(congs.size());
        out.flush();

    }

    private void consignacionesDiaCaja(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, IOException {
        HttpSession session = req.getSession(true);
        String email = (String) session.getAttribute("usuario");

        String sede = new DaoUsuarios().obtenerSedeUsuario(email);
        LocalDate date = LocalDate.now();
        String today = date.toString();

        List<Consignacion> congs = new DaoConsignaciones().listarConsignacionesDiaBySede(sede, today);

        resp.setContentType("text/plain");

        PrintWriter out = resp.getWriter();

        out.print(congs.size());
        out.flush();
    }

    private void consignacionesAplicadasCaja(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, SQLException, IOException {
        HttpSession session = req.getSession(true);
        String email = (String) session.getAttribute("usuario");
        int id_usuario = new DaoUsuarios().obtenerIdUsuario(email);

        List<Consignacion> congs = new DaoConsignaciones2().listarConsignacionesAplicadasByIdUsuario(id_usuario);

        resp.setContentType("text/plain");

        PrintWriter out = resp.getWriter();

        out.print(congs.size());
        out.flush();
    }

    private void consignacionesMesContabilidad(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, IOException {
        List<Consignacion> congs = new DaoConsignaciones().listarConsignacionesByEstado("Pendiente");
        resp.setContentType("text/plain");

        PrintWriter out = resp.getWriter();

        out.print(congs.size());
        out.flush();
    }

    private void consignacionesDiaContabilidad(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, SQLException, IOException {
        LocalDate date = LocalDate.now();
        String today = date.toString();
        List<Consignacion> congs = new DaoConsignaciones2().listarConsignacionesDiaContabilidad("Pendiente", today);

        resp.setContentType("text/plain");

        PrintWriter out = resp.getWriter();

        out.print(congs.size());
        out.flush();
    }

    private void consignacionesComprobadas(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, IOException {
        List<Consignacion> congs = new DaoConsignaciones().listarConsignacionesByEstado("Comprobado");
        resp.setContentType("text/plain");

        PrintWriter out = resp.getWriter();

        out.print(congs.size());
        out.flush();
    }

    private void actualizarConsignaciones(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, IOException, SQLException {
        int idConsignacion = Integer.parseInt(req.getParameter("idConsignacion"));
        String num_recibo = req.getParameter("num_recibo");
        float valor = Float.valueOf(req.getParameter("valor"));
        String fecha = req.getParameter("fecha_pago");
        Date fecha_pago = Funciones.FuncionesGenerales.fechaSQL(fecha, "yyyy-MM-dd");
        int id_obligacion = Integer.parseInt(req.getParameter("id_obligacion"));
        int id_banco = Integer.parseInt(req.getParameter("banco"));
        String estado = req.getParameter("estado");

        if (estado != null) {
            int id_estado = new DaoEstados().obtenerIdEstado(estado);
            HttpSession session = req.getSession(true);
            String emal = (String) session.getAttribute("usuario");
            int id_usuario = new DaoUsuarios().obtenerIdUsuario(emal);
            Actualizacion actu = new Actualizacion(id_estado, id_usuario);
            actu.setId_consignacion(idConsignacion);
            int id_actualizacion = new DaoActualizacion().guardarActualizacionWithIdConsignacion(actu);
            int actualizar_consi = new DaoConsignaciones().actualizarEstadoConsig(id_actualizacion, idConsignacion);

        }

        Consignacion con = new Consignacion();
        con.setIdConsignacion(idConsignacion);
        con.setNum_recibo(num_recibo);
        con.setValor(valor);
        con.setFecha_pago(fecha_pago);
        con.setId_obligacion(id_obligacion);
        con.setId_plataforma(id_banco);

        int actualizar_consignacion = new DaoConsignaciones2().actualizarConsignacion(con);

        resp.setContentType("text/plain");

        PrintWriter out = resp.getWriter();

        out.print(actualizar_consignacion);
        out.flush();
    }

    private void cancelarConsignacion(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, SQLException, IOException {
        int idConsignacion = Integer.parseInt(req.getParameter("idConsignacion"));
        HttpSession session = req.getSession(true);
        String email = (String) session.getAttribute("usuario");
        int id_usuario = new DaoUsuarios().obtenerIdUsuario(email);

        int id_estado = new DaoEstados().obtenerIdEstado("Cancelado");

        Actualizacion actu = new Actualizacion(id_estado, id_usuario);

        int id_actualizacion = new DaoActualizacion().guardarActualizacion(actu);

        int actualizar_consig = new DaoConsignaciones().actualizarEstadoConsig(id_actualizacion, idConsignacion);

        resp.setContentType("text/plain");

        PrintWriter out = resp.getWriter();

        out.print(actualizar_consig);
        out.flush();
    }

    private void devolverConsignacionCaja(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, SQLException, IOException {
        int idConsignacion = Integer.parseInt(req.getParameter("idConsignacion"));
        String observacion = req.getParameter("observacion");

        HttpSession session = req.getSession(true);
        String email = (String) session.getAttribute("usuario");
        int id_usuario = new DaoUsuarios().obtenerIdUsuario(email);

        Consignacion con = new DaoConsignaciones().listarConsignacionesById(idConsignacion);
        con.setId_aplicado(id_usuario);

        int guardarTempo = new DaoConsignaciones().guardarConsigTempCaja(con);
        int id_obs_tem = new DaoObservacion().observacionTemporal(observacion, id_usuario, idConsignacion);

        int actualizar_obser_consi_temp = new DaoConsignaciones().actualizarObservacionConsignacionTemporalCaja(id_obs_tem, idConsignacion);
        String estado = "Devuelta-Caja";
        int idEstado = new DaoEstados().obtenerIdEstado(estado);
        Actualizacion actu = new Actualizacion(idEstado, id_usuario);
        int idActu = new DaoActualizacion().guardarActualizacion(actu);
        int enviarActuConsigTempo = new DaoConsignaciones2().actualizarEstadoConsigTempCaja(idActu, idConsignacion);

        resp.setContentType("text/plain");

        PrintWriter out = resp.getWriter();

        out.print(enviarActuConsigTempo);
        out.flush();

    }

    private void cancelarCambiosIndividual(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, SQLException, IOException {
        int idConsignacion = Integer.parseInt(req.getParameter("idConsignacion"));

        int idObservacion = new DaoObservacion().obtenerIdObservacionTemporalByIdConsignacion(idConsignacion);
        if (idObservacion != 0) {
            int eliminarObserTemp = new DaoObservacion().eliminarObserTempById(idObservacion);
        } else {
            int eliminarConsigTemp = new DaoConsignaciones().eliminarConsigTempCajaByIdCon(idConsignacion);
            resp.setContentType("text/plain");

            PrintWriter out = resp.getWriter();

            out.print(eliminarConsigTemp);
            out.flush();
        }

    }

    private void validarConsignacion(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, SQLException, IOException {
        float valor = Float.valueOf(req.getParameter("valor"));
        Date fecha = Funciones.FuncionesGenerales.fechaSQL(req.getParameter("fecha"), "yyyy-MM-dd");

        int validar = new DaoConsignaciones2().ListarConsignacionFechaValor(fecha, valor);

        resp.setContentType("text/plain");

        PrintWriter out = resp.getWriter();

        out.print(validar);
        out.flush();

    }

    private void listarConsignacionesFechaValor(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, SQLException, IOException {
        float valor = Float.valueOf(req.getParameter("valor"));
        Date fecha = Funciones.FuncionesGenerales.fechaSQL(req.getParameter("fecha"), "yyyy-MM-dd");

        List<Consignacion> cons = new DaoConsignaciones2().validarConsignacionFechaValor(fecha, valor);
        Gson gson = new Gson();

        String json = gson.toJson(cons);
        resp.setContentType("application/json");

        PrintWriter out = resp.getWriter();

        out.print(json);
        out.flush();
    }

    private void validarIfExist(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, SQLException, IOException {
        int idConsignacion = Integer.parseInt(req.getParameter("idConsignacion"));

        HttpSession session = req.getSession(true);
        String email = (String) session.getAttribute("usuario");
        int id_usuario = new DaoUsuarios().obtenerIdUsuario(email);

        int exist = new DaoConsignaciones2().validarIfExistConsignacionByIdConsignacionAndIdUsuario(idConsignacion, id_usuario);
        resp.setContentType("text/plain");

        PrintWriter out = resp.getWriter();

        out.print(exist);
        out.flush();
    }

    private void validarEstado(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, SQLException, IOException {
        int idConsignacion = Integer.parseInt(req.getParameter("idConsignacion"));

        HttpSession session = req.getSession(true);
        String email = (String) session.getAttribute("usuario");
        int id_usuario = new DaoUsuarios().obtenerIdUsuario(email);

        int validarEstado = new DaoConsignaciones2().validarEstadoConsig(idConsignacion, id_usuario);
        resp.setContentType("text/plain");

        PrintWriter out = resp.getWriter();

        out.print(validarEstado);
        out.flush();
    }

    private void validarIfExistContabilidad(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, SQLException, IOException {
        int idConsignacion = Integer.parseInt(req.getParameter("idConsignacion"));

        HttpSession session = req.getSession(true);
        String email = (String) session.getAttribute("usuario");
        int id_usuario = new DaoUsuarios().obtenerIdUsuario(email);

        int exist = new DaoConsignaciones2().validarIfExistConsignacionByIdConsignacionAndIdUsuarioContabilidad(idConsignacion, id_usuario);
        resp.setContentType("text/plain");

        PrintWriter out = resp.getWriter();

        out.print(exist);
        out.flush();
    }

    private void obtenerConsignacionesBySede(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, IOException {
        int sede = Integer.parseInt(req.getParameter("sede"));
        String estado = req.getParameter("estado");

        List<Consignacion> consignaciones = new DaoConsignaciones2().listarConsignacionesByEstadoAndBySede(estado, sede);
        Gson gson = new Gson();

        String json = gson.toJson(consignaciones);
        resp.setContentType("application/json");

        PrintWriter out = resp.getWriter();

        out.print(json);
        out.flush();

    }

    private void obtenerConsignacionesBySedeByEstadoByFecha(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, IOException {
        int sede = Integer.parseInt(req.getParameter("sede"));
        String estado = req.getParameter("estado");
        String fechaString = req.getParameter("fecha");
        Date fecha = Funciones.FuncionesGenerales.fechaSQL(fechaString, "yyyy-MM-dd");

        List<Consignacion> consignaciones = new DaoConsignaciones2().listarConsignacionesByEstadoAndBySedeByEstadoByFecha(estado, sede, fecha);
        Gson gson = new Gson();

        String json = gson.toJson(consignaciones);
        resp.setContentType("application/json");

        PrintWriter out = resp.getWriter();

        out.print(json);
        out.flush();
    }

    private void obtenerConsignacionesByEstadoByFecha(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, IOException {
        String estado = req.getParameter("estado");
        String fechaString = req.getParameter("fecha");
        Date fecha = Funciones.FuncionesGenerales.fechaSQL(fechaString, "yyyy-MM-dd");
        List<Consignacion> consignaciones = new DaoConsignaciones2().listarConsignacionesByEstadoAndByEstadoByFecha(estado, fecha);
        Gson gson = new Gson();

        String json = gson.toJson(consignaciones);
        resp.setContentType("application/json");

        PrintWriter out = resp.getWriter();

        out.print(json);
        out.flush();
    }

    private void obtenerConsignacionesByFecha(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, IOException {
        String fechaString = req.getParameter("fecha");
        Date fecha = Funciones.FuncionesGenerales.fechaSQL(fechaString, "yyyy-MM-dd");
        List<Consignacion> consignaciones = new DaoConsignaciones2().listarConsignacionesByFecha(fecha);
        Gson gson = new Gson();

        String json = gson.toJson(consignaciones);
        resp.setContentType("application/json");

        PrintWriter out = resp.getWriter();

        out.print(json);
        out.flush();
    }

    private void obtenerConsignacionesSede(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, IOException {
        int sede = Integer.parseInt(req.getParameter("sede"));
        List<Consignacion> consignaciones = new DaoConsignaciones2().listarConsignacionesBySede(sede);
        Gson gson = new Gson();

        String json = gson.toJson(consignaciones);
        resp.setContentType("application/json");

        PrintWriter out = resp.getWriter();

        out.print(json);
        out.flush();
    }
    
    private void obtenerConsignacionesSedeByFecha(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, IOException {
        int sede = Integer.parseInt(req.getParameter("sede"));
        String fechaString = req.getParameter("fecha");
        Date fecha = Funciones.FuncionesGenerales.fechaSQL(fechaString, "yyyy-MM-dd");
        List<Consignacion> consignaciones = new DaoConsignaciones2().listarConsignacionesBySedeByFecha(sede, fecha);
        Gson gson = new Gson();

        String json = gson.toJson(consignaciones);
        resp.setContentType("application/json");

        PrintWriter out = resp.getWriter();

        out.print(json);
        out.flush();
    }

    private void traerActualizaciones(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, IOException {
        int idConsignacion = Integer.parseInt(req.getParameter("idConsignacion"));
        
        List<Actualizacion> actualizaciones = new DaoActualizacion().obtenerActualizacionesByIdConsignacion(idConsignacion);
         Gson gson = new Gson();

        String json = gson.toJson(actualizaciones);
        resp.setContentType("application/json");

        PrintWriter out = resp.getWriter();

        out.print(json);
        out.flush();
    }

    private void validarConsignacionesCajaTemporal(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, SQLException {
      
        List<Consignacion> consignacionesTemporales = new DaoConsignaciones().listarConsinacionesTempCajaByIdUsuario(0);
        System.out.println(consignacionesTemporales.size());
        if(consignacionesTemporales.size() > 0){
            int eliminar = new DaoConsignaciones2().eliminarConsignacionesTemporalesById(0);
            
        }
    }

    private void validarConsignacionesContabilidademporal(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException {
        List<Consignacion> consignacionesTemporales = new DaoConsignaciones().listarConsinacionesTemp(0);
        System.out.println(consignacionesTemporales.size());
        if(consignacionesTemporales.size() > 0){
            int eliminar = new DaoConsignaciones2().eliminarConsignacionesTemporalesContabilidadById(0);
            
        }
    }

    private void validarExistenciaByRecibo(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, SQLException, IOException {
        String num_recibo = req.getParameter("recibo");
        
        
        List<Consignacion> consignaciones = new DaoConsignaciones2().validarConsignacionRecibo(num_recibo);
         Gson gson = new Gson();

        String json = gson.toJson(consignaciones);
        resp.setContentType("application/json");

        PrintWriter out = resp.getWriter();

        out.print(json);
        out.flush();
    }

}
