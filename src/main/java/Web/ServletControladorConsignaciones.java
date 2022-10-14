package Web;

import Datos.DaoActualizacion;
import Datos.DaoConsignaciones;
import Datos.DaoConsignaciones2;
import Datos.DaoEstados;
import Datos.DaoFiles;
import Datos.DaoObservacion;
import Datos.DaoUsuarios;
import Dominio.Actualizacion;
import Dominio.Archivo;
import Dominio.Consignacion;
import Dominio.Obligaciones;
import Dominio.Observaciones;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Date;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.joda.time.DateTime;
import org.joda.time.LocalDate;

@WebServlet(urlPatterns = {"/ServletControladorConsignaciones"})
public class ServletControladorConsignaciones extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        String accion = req.getParameter("accion");

        if (accion != null) {
            switch (accion) {
                case "listarConsignaciones": {
                    try {
                        this.listarConsignaciones(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "listarConsignacionesByEstado": {
                    try {
                        this.listarConsignacionesByEstado(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "listarConsignacionesByCedula": {
                    try {
                        this.listarConsignacionesCedula(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;

                case "listarClienteByCedula": {
                    try {
                        this.listarClientesByCedula(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "listarConsignacionesCaja": {
                    try {
                        this.listarConsignacionesCaja(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "cancelarCambios": {
                    try {
                        this.cancelarCambios(req, resp);
                    } catch (ClassNotFoundException | SQLException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "cancelarCambiosCaja": {
                    try {
                        this.cancelarCambiosCaja(req, resp);
                    } catch (ClassNotFoundException | SQLException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "guardarCambios": {
                    try {
                        this.guardarCambios(req, resp);
                    } catch (ClassNotFoundException | SQLException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "guardarCambiosCaja": {
                    try {
                        this.guardarCambiosCaja(req, resp);
                    } catch (ClassNotFoundException | SQLException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "editarConsignacion": {
                    try {
                        this.editarConsignacion(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "consignacionesMes": {
                    try {
                        this.consignacionesMes(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "consignacionesDia": {
                    try {
                        this.consignacionesDia(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;

                case "consignacionesDevueltas": {
                    try {
                        this.consignacionesDevueltas(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "consignacionesPendientes": {
                    try {
                        this.consignacionesPendientes(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
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
                case "consignacionesAplicadas": {
                    try {
                        this.consignacionesAplicadas(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "cancelarCambiosIndividual": {
                    try {
                        this.cancelarCambiosIndividual(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "cancelarDevolucionConsignacionById": {
                    try {
                        this.cancelarDevolucionConsignacionById(req, resp);
                    } catch (ClassNotFoundException | SQLException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case"listarConsignacionesByValor":
                {
                    try {
                        this.listarConsignacionesByValor(req, resp);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
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
                case "actualizarConsignacion": {
                    try {
                        this.actualizarConsignacion(req, resp);
                    } catch (ClassNotFoundException | SQLException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "ConsignacionTemporal": {
                    try {
                        this.ConsignacionTemporal(req, resp);
                    } catch (ClassNotFoundException | SQLException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "ConsignacionTemporalCaja": {
                    try {
                        this.ConsignacionTemporalCaja(req, resp);
                    } catch (ClassNotFoundException | SQLException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "devolverConsignaciones": {
                    try {
                        this.devolverConsiganciones(req, resp);
                    } catch (ClassNotFoundException | SQLException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;
                case "ConsignacionTemporalDevolver": {
                    try {
                        this.ConsignacionTemporalDevolver(req, resp);
                    } catch (ClassNotFoundException | SQLException ex) {
                        Logger.getLogger(ServletControladorConsignaciones.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                break;

            }
        }

    }

    private void listarConsignaciones(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, IOException {
        List<Consignacion> consignaciones = new DaoConsignaciones().listarConsignaciones();

        Gson gson = new Gson();

        String json = gson.toJson(consignaciones);
        resp.setContentType("application/json");

        PrintWriter out = resp.getWriter();

        out.print(json);
        out.flush();
    }

    private void listarConsignacionesByEstado(HttpServletRequest req, HttpServletResponse resp) throws IOException, ClassNotFoundException {

        String estado = req.getParameter("estado");

        List<Consignacion> consignaciones = new DaoConsignaciones().listarConsignacionesByEstado(estado);

        Gson gson = new Gson();

        String json = gson.toJson(consignaciones);
        resp.setContentType("application/json");

        PrintWriter out = resp.getWriter();

        out.print(json);
        out.flush();
    }

    private void listarConsignacionesCedula(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, IOException {
        String cedula = req.getParameter("cedula");

        List<Consignacion> consignaciones = new DaoConsignaciones().listarConsignacionesByCedula(cedula);

        Gson gson = new Gson();

        String json = gson.toJson(consignaciones);
        resp.setContentType("application/json");

        PrintWriter out = resp.getWriter();

        out.print(json);
        out.flush();
    }

    private void listarClientesByCedula(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, IOException {

        String cedula = req.getParameter("cedula");

        List<Obligaciones> obligaciones = new DaoConsignaciones().listarClienteByCedula(cedula);

        Gson gson = new Gson();

        String json = gson.toJson(obligaciones);
        resp.setContentType("application/json");

        PrintWriter out = resp.getWriter();

        out.print(json);
        out.flush();
    }

    private void actualizarConsignacion(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, SQLException, IOException {
        int idConsignaciones = Integer.parseInt(req.getParameter("idConsignacion"));
        HttpSession sesion = req.getSession(true);
        String email = (String) sesion.getAttribute("usuario");
        String estado = req.getParameter("estado");
        int idEstado = new DaoEstados().obtenerIdEstado(estado);
        int idUsuario = new DaoUsuarios().obtenerIdUsuario(email);
        Date fecha = Funciones.FuncionesGenerales.obtenerFechaServer("yyyy-MM-dd");

        Actualizacion actu = new Actualizacion(fecha, idEstado, idUsuario);
        actu.setId_consignacion(idConsignaciones);
        int idActualizacion = new DaoActualizacion().guardarActualizacionWithIdConsignacion(actu);

        int updateConsignacion = new DaoConsignaciones().actualizarEstadoConsig(idActualizacion, idConsignaciones);

        resp.setContentType("text/plain");

        PrintWriter out = resp.getWriter();

        out.print(updateConsignacion);
        out.flush();

    }

    private void listarConsignacionesCaja(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, IOException {
        HttpSession sesion = req.getSession(true);
        String email = (String) sesion.getAttribute("usuario");

        String sede = new DaoUsuarios().obtenerSedeUsuario(email);

        List<Consignacion> consignaciones = new DaoConsignaciones().listarConsignacionesBySede(sede);

        Gson gson = new Gson();

        String json = gson.toJson(consignaciones);
        resp.setContentType("application/json");

        PrintWriter out = resp.getWriter();

        out.print(json);
        out.flush();
    }

    private void ConsignacionTemporal(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, SQLException, IOException {
        int id_consignacion = Integer.parseInt(req.getParameter("idConsignacion"));

        HttpSession session = req.getSession(true);
        String email = (String) session.getAttribute("usuario");
        int id_usuario = new DaoUsuarios().obtenerIdUsuario(email);
        if (id_usuario == 0) {
            
            resp.setContentType("text/plain");

            PrintWriter out = resp.getWriter();

            out.print("null");
            out.flush();

        }

        Consignacion conTemp = new DaoConsignaciones().listarConsignacionesById(id_consignacion);
        conTemp.setId_aplicado(id_usuario);

        int guardarConsignacionesTemp = new DaoConsignaciones().guardarConsigTemp(conTemp);

        id_consignacion = 0;
        conTemp = null;

        resp.setContentType("text/plain");

        PrintWriter out = resp.getWriter();

        out.print(guardarConsignacionesTemp);
        out.flush();
    }

    private void cancelarCambios(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, SQLException, IOException {
        HttpSession session = req.getSession(true);
        String email = (String) session.getAttribute("usuario");
        int id_usuario = new DaoUsuarios().obtenerIdUsuario(email);
        int eliminarTempo = new DaoConsignaciones().eliminarConsigTemp(id_usuario);
        int eliminarObservaTemp = new DaoObservacion().eliminarObserTemp();

        resp.setContentType("text/plain");

        PrintWriter out = resp.getWriter();

        out.print(eliminarTempo);
        out.flush();

    }

    private void guardarCambios(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, SQLException, IOException {
        HttpSession sesion = req.getSession(true);
        String email = (String) sesion.getAttribute("usuario");
        int id_usuario = new DaoUsuarios().obtenerIdUsuario(email);
        List<Consignacion> consignaciones = new DaoConsignaciones().listarConsinacionesTemp(id_usuario);

        System.out.println(email);
        int confirmacion = 0;
        String estado = "Comprobado";

        for (Consignacion consig : consignaciones) {

            if (consig.getId_observacion() == 0) {

                //obtenemos datos para guardar los datos de la actualizacion
                int id_estado = new DaoEstados().obtenerIdEstado(estado);

                Actualizacion actu = new Actualizacion(id_estado, id_usuario);
                actu.setId_consignacion(consig.getIdConsignacion());
                //guardamos la actualizacion
                int guardarActu = new DaoActualizacion().guardarActualizacionWithIdConsignacion(actu);

                //enviamos el id de la actualizacion a la consignacion con el idConsignacion correspondiente
                int actualizarConsig = new DaoConsignaciones().actualizarEstadoConsig(guardarActu, consig.getIdConsignacion());
                confirmacion = actualizarConsig;

            } else {
                int id_observacion = consig.getId_observacion();
                Observaciones obs = new DaoObservacion().obtenerObservacionTemporalById(id_observacion);
                if (obs.getError() == null) {
                    int crearObservacionTablaObservacion = new DaoObservacion().guardarObservacion(obs);
                    int actualizarObservacionConsig = new DaoConsignaciones().actualizarObservacionConsignacion(crearObservacionTablaObservacion, consig.getIdConsignacion());
                    String estadoD = "Devuelta";

                    int id_estado = new DaoEstados().obtenerIdEstado(estadoD);

                    Actualizacion actu = new Actualizacion(id_estado, id_usuario);
                    actu.setId_consignacion(consig.getIdConsignacion());
                    //guardamos la actualizacion
                    int guardarActu = new DaoActualizacion().guardarActualizacionWithIdConsignacion(actu);

                    //enviamos el id de la actualizacion a la consignacion con el idConsignacion correspondiente
                    int actualizarConsig = new DaoConsignaciones().actualizarEstadoConsig(guardarActu, consig.getIdConsignacion());
                    confirmacion = actualizarConsig;
                } else {

                    //obtenemos datos para guardar los datos de la actualizacion
                    int id_estado = new DaoEstados().obtenerIdEstado(estado);

                    Actualizacion actu = new Actualizacion(id_estado, id_usuario);
                    actu.setId_consignacion(consig.getIdConsignacion());
                    //guardamos la actualizacion
                    int guardarActu = new DaoActualizacion().guardarActualizacionWithIdConsignacion(actu);

                    //enviamos el id de la actualizacion a la consignacion con el idConsignacion correspondiente
                    int actualizarConsig = new DaoConsignaciones().actualizarEstadoConsig(guardarActu, consig.getIdConsignacion());
                    confirmacion = actualizarConsig;

                }
            }

        }

        if (confirmacion == 1) {

            List<Consignacion> conTemp = new DaoConsignaciones().listarConsinacionesTempPdf(id_usuario);

            String ruta = Funciones.FuncionesGenerales.generarPdf(conTemp, email);
            String nombreArchivo = Funciones.FuncionesGenerales.nombreArchivo(ruta);

            DateTime fechaHora = Funciones.FuncionesGenerales.stringToDateTime(Funciones.FuncionesGenerales.fechaDateTime());
            Archivo file = new Archivo(nombreArchivo, ruta, fechaHora, id_usuario);
            int guardarFile = new DaoFiles().guardarArchivoReportes(file);
            int eliminarTemp = new DaoConsignaciones().eliminarConsigTemp(id_usuario);
            int eliminarObservacionesTemp = new DaoObservacion().eliminarObserTemp();
            resp.setContentType("text/plain");

            PrintWriter out = resp.getWriter();

            out.print(eliminarTemp);
            out.flush();
        } else {
            resp.setContentType("text/plain");

            PrintWriter out = resp.getWriter();

            out.print(confirmacion);
            out.flush();
        }
    }

    private void devolverConsiganciones(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, SQLException, IOException {
        HttpSession sesion = req.getSession();
        int id_consignacion = Integer.parseInt(req.getParameter("idConsignacion"));
        String observacion = req.getParameter("observacion");

        int id_estado = new DaoEstados().obtenerIdEstado("Devuelta");
        String email = (String) sesion.getAttribute("usuario");
        int id_usuario = new DaoUsuarios().obtenerIdUsuario(email);

        Observaciones observa = new Observaciones(observacion, id_usuario, id_consignacion);
        //guarda la observacion y obtiene el id, todo en este metodo 
        int id_observacion = new DaoObservacion().guardarObservacion(observa);

        //le enviamos el id de la observacion y el id de la consignacion para actualizarlo en la tabla consignaciones
        int actualizarObservacionConsignacion = new DaoConsignaciones().actualizarObservacionConsignacion(id_observacion, id_consignacion);

        Actualizacion actu = new Actualizacion(id_estado, id_usuario);
        actu.setId_consignacion(id_consignacion);
        int crearActua = new DaoActualizacion().guardarActualizacionWithIdConsignacion(actu);
        int id_actualizacion = new DaoActualizacion().obtenerIdActualizacion();

        int actualizarConsi = new DaoConsignaciones().actualizarEstadoConsig(id_actualizacion, id_consignacion);

        if (actualizarObservacionConsignacion == 1 && actualizarConsi == 1) {
            resp.setContentType("text/plain");

            PrintWriter out = resp.getWriter();

            out.print(actualizarConsi);
            out.flush();
        } else {
            resp.sendError(500, "Error 500, Internal Server Error");
        }

    }

    private void editarConsignacion(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, IOException {
        int id_consignacion = Integer.parseInt(req.getParameter("idConsignacion"));

        Consignacion consignacion = new DaoConsignaciones().listarConsignacionesEditar(id_consignacion);

        Gson gson = new Gson();

        String json = gson.toJson(consignacion);
        resp.setContentType("application/json");

        PrintWriter out = resp.getWriter();

        out.print(json);
        out.flush();

    }

    private void ConsignacionTemporalCaja(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, SQLException, IOException {
        int id_consignacion = Integer.parseInt(req.getParameter("idConsignacion"));
        Consignacion conTemp = new DaoConsignaciones().listarConsignacionesById(id_consignacion);
        HttpSession session = req.getSession(true);
        String email = (String) session.getAttribute("usuario");
        int id_usuario = new DaoUsuarios().obtenerIdUsuario(email);
        conTemp.setId_aplicado(id_usuario);

        int guardarConsignacionesTemp = new DaoConsignaciones().guardarConsigTempCaja(conTemp);

        resp.setContentType("text/plain");

        PrintWriter out = resp.getWriter();

        out.print(guardarConsignacionesTemp);
        out.flush();
    }

    private void guardarCambiosCaja(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, SQLException, IOException {

        HttpSession sesion = req.getSession(true);
        String email = (String) sesion.getAttribute("usuario");
        int id_usuario = new DaoUsuarios().obtenerIdUsuario(email);
        String estadoComp = "Comprobado";
        int idEstadoComp = new DaoEstados().obtenerIdEstado(estadoComp);
        List<Consignacion> consignaciones = new DaoConsignaciones().listarConsinacionesTempCajaPdf(id_usuario, idEstadoComp);
        List<Consignacion> consig = new DaoConsignaciones().listarConsinacionesTempCajaByIdUsuario(id_usuario);
        int confirmacion = 0;
        String estadoAp = "Aplicado";
        int idEstadoAp = new DaoEstados().obtenerIdEstado(estadoAp);
        String estadoDeC = "Devuelta-Caja";
        int idEstadoDevC = new DaoEstados().obtenerIdEstado(estadoDeC);

        for (Consignacion con : consig) {
            int idEstado = new DaoActualizacion().obtenerIdEstadoByIdActualizacion(con.getId_actualizacion());

            if (idEstado == idEstadoAp) {

                Actualizacion actu = new Actualizacion(idEstadoAp, id_usuario);
                actu.setId_consignacion(con.getIdConsignacion());
                int guardarActu = new DaoActualizacion().guardarActualizacionWithIdConsignacion(actu);
                int actualizarConsig = new DaoConsignaciones().actualizarEstadoConsig(guardarActu, con.getIdConsignacion());
                confirmacion = actualizarConsig;
            } else {
                if (idEstado == idEstadoComp) {
                    Actualizacion actu = new Actualizacion(idEstadoAp, id_usuario);
                    actu.setId_consignacion(con.getIdConsignacion());
                    int guardarActu = new DaoActualizacion().guardarActualizacionWithIdConsignacion(actu);
                    int actualizarConsig = new DaoConsignaciones().actualizarEstadoConsig(guardarActu, con.getIdConsignacion());
                    confirmacion = actualizarConsig;
                } else {
                    Observaciones obs = new DaoObservacion().obtenerObservacionTemporalById(con.getId_observacion());

                    int crearObserva = new DaoObservacion().guardarObservacion(obs);
                    int actualizarObservaConsigna = new DaoConsignaciones().actualizarObservacionConsignacion(crearObserva, con.getIdConsignacion());
                    Actualizacion actu = new Actualizacion(idEstadoDevC, id_usuario);
                    actu.setId_consignacion(con.getIdConsignacion());
                    int actuNew = new DaoActualizacion().guardarActualizacionWithIdConsignacion(actu);
                    int actuConsig = new DaoConsignaciones().actualizarEstadoConsig(actuNew, con.getIdConsignacion());

                    confirmacion = actuConsig;
                }

            }

        }

        if (confirmacion == 1) {

            String ruta = Funciones.FuncionesGenerales.generarPdfCaja(consignaciones, email);
            String nombreArchivo = Funciones.FuncionesGenerales.nombreArchivo(ruta);

            DateTime fechaHora = Funciones.FuncionesGenerales.stringToDateTime(Funciones.FuncionesGenerales.fechaDateTime());
            Archivo file = new Archivo(nombreArchivo, ruta, fechaHora, id_usuario);
            int guardarFile = new DaoFiles().guardarArchivoReportes(file);
            int eliminarTemp = new DaoConsignaciones().eliminarConsigTempCaja(id_usuario);
            int eliminarObserTem = new DaoObservacion().eliminarObserTempByIdUsuario(id_usuario);
            resp.setContentType("text/plain");

            PrintWriter out = resp.getWriter();

            out.print(guardarFile);
            out.flush();
        } else {
            resp.setContentType("text/plain");

            PrintWriter out = resp.getWriter();

            out.print(confirmacion);
            out.flush();
        }

    }

    private void cancelarCambiosCaja(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, SQLException, IOException {
        HttpSession session = req.getSession(true);
        String email = (String) session.getAttribute("usuario");
        int id_usuario = new DaoUsuarios().obtenerIdUsuario(email);

        int eliminarTempo = new DaoConsignaciones().eliminarConsigTempCaja(id_usuario);
        int eliminarObserTem = new DaoObservacion().eliminarObserTempByIdUsuario(id_usuario);

        resp.setContentType("text/plain");

        PrintWriter out = resp.getWriter();

        out.print(eliminarTempo);
        out.flush();
    }

    private void consignacionesMes(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, IOException {
        String fechaInicoMes = Funciones.FuncionesGenerales.fechaInicioMes();
        String fechaFinMes = Funciones.FuncionesGenerales.fechaFinMes();
        System.out.println(fechaInicoMes);
        System.out.println(fechaFinMes);
        List<Consignacion> congs = new DaoConsignaciones().listarConsignacionesMes(fechaInicoMes, fechaFinMes);

        resp.setContentType("text/plain");

        PrintWriter out = resp.getWriter();

        out.print(congs.size());
        out.flush();
    }

    private void consignacionesDia(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, IOException {
        LocalDate date = LocalDate.now();
        String today = date.toString();

        List<Consignacion> congs = new DaoConsignaciones().listarConsignacionesDia(today);
        resp.setContentType("text/plain");

        PrintWriter out = resp.getWriter();

        out.print(congs.size());
        out.flush();
    }

    private void consignacionesDevueltas(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, IOException {
        List<Consignacion> congs = new DaoConsignaciones().listarConsignacionesByEstado("Devuelta");
        System.out.println(congs.size());
        resp.setContentType("text/plain");

        PrintWriter out = resp.getWriter();

        out.print(congs.size());
        out.flush();
    }

    private void consignacionesPendientes(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, IOException {
        List<Consignacion> congs = new DaoConsignaciones().listarConsignacionesByEstado("Pendiente");
        System.out.println(congs.size());
        resp.setContentType("text/plain");

        PrintWriter out = resp.getWriter();

        out.print(congs.size());
        out.flush();
    }

    private void consignacionesComprobadas(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, IOException {
        List<Consignacion> congs = new DaoConsignaciones().listarConsignacionesByEstado("Comprobado");
        System.out.println(congs.size());
        resp.setContentType("text/plain");

        PrintWriter out = resp.getWriter();

        out.print(congs.size());
        out.flush();
    }

    private void consignacionesAplicadas(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, IOException {
        List<Consignacion> congs = new DaoConsignaciones().listarConsignacionesByEstado("Aplicado");
        System.out.println(congs.size());
        resp.setContentType("text/plain");

        PrintWriter out = resp.getWriter();

        out.print(congs.size());
        out.flush();
    }

    private void ConsignacionTemporalDevolver(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, SQLException, IOException {
        int idCosignacion = Integer.parseInt(req.getParameter("idConsignacion"));
        System.out.println(idCosignacion);
        String mensaje = req.getParameter("observacion");

        HttpSession session = req.getSession(true);
        String email = (String) session.getAttribute("usuario");
        int id_usuario = new DaoUsuarios().obtenerIdUsuario(email);

        Consignacion conTemp = new DaoConsignaciones().listarConsignacionesById(idCosignacion);
        conTemp.setId_aplicado(id_usuario);
        int temporal = new DaoConsignaciones().guardarConsigTemp(conTemp);

        int observacionTemporal = new DaoObservacion().observacionTemporal(mensaje, id_usuario, idCosignacion);

        int enviarIdConsignacion = new DaoObservacion().enviarIdConsignacion(conTemp.getIdConsignacion(), observacionTemporal);

        int actualizarConsigObser = new DaoConsignaciones().actualizarObservacionConsignacionTemporal(observacionTemporal, conTemp.getIdConsignacion());
        resp.setContentType("text/plain");

        PrintWriter out = resp.getWriter();

        out.print(actualizarConsigObser);
        out.flush();
    }

    private void cancelarCambiosIndividual(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, IOException {
        int idConsignacion = Integer.parseInt(req.getParameter("idConsignacion"));
        int eliminarConsingacion = new DaoConsignaciones2().eliminarConsignacionById(idConsignacion);
        resp.setContentType("text/plain");

        PrintWriter out = resp.getWriter();

        out.print(eliminarConsingacion);
        out.flush();
    }

    private void cancelarDevolucionConsignacionById(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, SQLException, IOException {
        int idConsignacion = Integer.parseInt(req.getParameter("idConsignacion"));

        int id_observacion_temporal = new DaoObservacion().obtenerIdObservacionTemporalByIdConsignacion(idConsignacion);

        int eliminar_observacion_temporal = new DaoObservacion().eliminarObserTempById(id_observacion_temporal);

        int eliminar_consignacion_temporal = new DaoConsignaciones().eliminarConsigTempById(idConsignacion);
        resp.setContentType("text/plain");

        PrintWriter out = resp.getWriter();

        out.print(eliminar_consignacion_temporal);
        out.flush();

    }

    private void listarConsignacionesByValor(HttpServletRequest req, HttpServletResponse resp) throws ClassNotFoundException, IOException {
        float valor = Float.valueOf(req.getParameter("valor"));
        
         List<Consignacion> consignaciones = new DaoConsignaciones().listarConsignacionesByValor(valor);
         Gson gson = new Gson();

        String json = gson.toJson(consignaciones);
        resp.setContentType("application/json");

        PrintWriter out = resp.getWriter();

        out.print(json);
        out.flush();
        
    }
}
