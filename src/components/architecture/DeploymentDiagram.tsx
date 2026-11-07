import React from 'react';
import {
  Server,
  Database,
  Shield,
  Globe,
  ArrowDown,
  Layers,
  Cpu,
  HardDrive,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';

export const DeploymentDiagram: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-600" />
            <span>Modelo de Despliegue Físico & Alta Disponibilidad (Sección 6.3)</span>
          </h3>
          <p className="text-xs text-slate-500">
            Topología en contenedores Docker con balanceo NGINX y cluster PostgreSQL Multi-AZ con auto-failover (RNF-03, RNF-04).
          </p>
        </div>
        <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          Disponibilidad 99.5%
        </span>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {/* Tier 1: Client Browsers */}
        <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Navegadores Clientes Web (Chrome, Firefox, Safari, Edge)</h4>
              <p className="text-xs text-slate-300">
                Acceso multiplataforma responsivo sin software adicional · Máximo 300 usuarios concurrentes nominales.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800">
            HTTPS / TLS 1.3 (Port 443)
          </span>
        </div>

        {/* Down link */}
        <div className="flex justify-center -my-2">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full border border-slate-200 text-[11px] font-mono text-slate-600 shadow-sm">
            <ArrowDown className="w-3.5 h-3.5 text-slate-500" />
            <span>Cifrado de Extremo a Extremo (RNF-01)</span>
          </div>
        </div>

        {/* Tier 2: Cloudflare WAF & Edge CDN */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-700 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Cloudflare WAF & Edge DNS Protection</h4>
              <p className="text-xs text-slate-600">
                Mitigación volumétrica de ataques DDoS L3/L4/L7, terminación SSL y caché de estáticos SPA (HTML/JS/CSS).
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-amber-800 font-semibold">Edge Security</span>
        </div>

        {/* Down link */}
        <div className="flex justify-center -my-2">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full border border-slate-200 text-[11px] font-mono text-slate-600 shadow-sm">
            <ArrowDown className="w-3.5 h-3.5 text-slate-500" />
            <span>Tráfico HTTP Reverse Proxy</span>
          </div>
        </div>

        {/* Tier 3: Load Balancer Nginx */}
        <div className="p-4 bg-white rounded-xl border border-slate-300 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs font-mono">
              NGINX
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Load Balancer NGINX (Layer 7 Round-Robin)</h4>
              <p className="text-xs text-slate-500">
                Distribución equitativa de carga sin sesión compartida en servidor (Arquitectura Stateless con JWT - RNF-04).
              </p>
            </div>
          </div>
          <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded">
            Health Check: /api/health
          </span>
        </div>

        {/* Down links split to 2 Docker Nodes */}
        <div className="flex justify-around -my-2 px-12">
          <div className="flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 rounded-full border border-slate-200 text-[10px] font-mono text-slate-600">
            <ArrowDown className="w-3 h-3 text-emerald-600" />
            <span>Nodo 01</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 rounded-full border border-slate-200 text-[10px] font-mono text-slate-600">
            <ArrowDown className="w-3 h-3 text-emerald-600" />
            <span>Nodo 02</span>
          </div>
        </div>

        {/* Tier 4: Compute Layer (Docker Nodes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-emerald-600" />
                <span>Nodo App 01: Docker Container</span>
              </span>
              <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-mono font-bold">
                EN LÍNEA
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Backend Monolítico Modular (Node/Express/TypeScript). Pool de conexiones HikariCP configurado con 50 conexiones máx.
            </p>
            <div className="text-[11px] font-mono text-slate-500 pt-1 border-t border-slate-200">
              IP Interna: 10.0.1.14:3000 · CPU: 12% · RAM: 320 MB
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-emerald-600" />
                <span>Nodo App 02: Docker Container</span>
              </span>
              <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-mono font-bold">
                EN LÍNEA
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Réplica idéntica horizontal (Escalabilidad RNF-04). Si el Nodo 01 falla, NGINX conmuta tráfico inmediatamente sin caída.
            </p>
            <div className="text-[11px] font-mono text-slate-500 pt-1 border-t border-slate-200">
              IP Interna: 10.0.1.15:3000 · CPU: 10% · RAM: 315 MB
            </div>
          </div>
        </div>

        {/* Down link to Database */}
        <div className="flex justify-center -my-2">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full border border-slate-200 text-[11px] font-mono text-slate-600 shadow-sm">
            <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
            <span>Pool Transaccional Seguro (Puerto 5432)</span>
          </div>
        </div>

        {/* Tier 5: PostgreSQL Database Cluster (Primary R/W + Standby R/O) */}
        <div className="p-5 bg-slate-900 text-white rounded-xl border border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-400" />
              <span className="font-bold text-white uppercase tracking-wider font-mono">
                Cluster de Base de Datos PostgreSQL 16
              </span>
            </div>
            <span className="text-xs font-mono text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
              Multi-AZ Failover &lt; 60s
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Primary DB */}
            <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-400">Nodo Primario (Read / Write)</span>
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                  MASTER
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Atiende todas las transacciones de escritura (INSERT matrícula, UPDATE calificaciones, SELECT FOR UPDATE con lock a nivel de fila).
              </p>
              <div className="text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-700">
                Zona: us-east-1a · Storage: 500GB SSD nvme
              </div>
            </div>

            {/* Standby Replica */}
            <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-blue-400">Nodo Réplica Standby (Read-Only)</span>
                <span className="text-[10px] font-mono bg-blue-950 text-blue-400 px-2 py-0.5 rounded border border-blue-800">
                  HOT STANDBY
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Replicación streaming síncrona de WAL. Atiende reportes analíticos masivos y consultas de notas para no saturar al máster.
              </p>
              <div className="text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-700">
                Zona: us-east-1b · Lag de replicación: 0 ms
              </div>
            </div>
          </div>

          {/* Backup & Cold Storage */}
          <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-purple-400" />
              <span className="text-slate-300">
                Copias de respaldo diarias automatizadas en almacenamiento en frío (AWS S3 / GCS).
              </span>
            </div>
            <span className="font-mono text-purple-300 text-[11px]">
              RPO &lt; 24h · RTO &lt; 2h (RNF-09)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
